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
    const { email, password, credential, challenge } = await req.json()

    if (!email || !password || !credential) {
      throw new Error('Email, password, and credential are required')
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Sign up the user with email/password
    const { data: authData, error: authError } = await supabaseClient.auth.signUp({
      email,
      password,
    })

    if (authError) throw authError

    // Store the WebAuthn credential
    const { error: credError } = await supabaseClient
      .from('webauthn_credentials')
      .insert({
        user_id: authData.user!.id,
        credential_id: credential.id,
        public_key: credential.publicKey,
        counter: 0,
        transports: credential.transports || [],
      })

    if (credError) throw credError

    return new Response(
      JSON.stringify({ success: true, user: authData.user }),
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