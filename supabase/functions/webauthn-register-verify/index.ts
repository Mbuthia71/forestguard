import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email, credential, challenge } = await req.json()

    if (!email || !credential) {
      throw new Error('Email and credential are required')
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Ensure user exists (no password required), auto-confirmed
    const { data: users, error: listErr } = await supabaseClient.auth.admin.listUsers()
    if (listErr) throw listErr
    let user = users.users.find(u => u.email === email)

    if (!user) {
      const { data: created, error: createErr } = await supabaseClient.auth.admin.createUser({
        email,
        email_confirm: true,
      })
      if (createErr) throw createErr
      user = created.user!
    }

    // Store the WebAuthn credential
    const { error: credError } = await supabaseClient
      .from('webauthn_credentials')
      .insert({
        user_id: user!.id,
        credential_id: credential.id,
        public_key: credential.publicKey,
        counter: 0,
        transports: credential.transports || [],
      })

    if (credError) throw credError

    return new Response(
      JSON.stringify({ success: true, user }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})