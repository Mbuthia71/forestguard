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
    const { email, credentialId, signature } = await req.json()

    if (!email || !credentialId) {
      throw new Error('Email and credential ID are required')
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get user by email
    const { data: users, error: userError } = await supabaseClient.auth.admin.listUsers()
    
    if (userError) throw userError

    const user = users.users.find(u => u.email === email)
    if (!user) {
      throw new Error('User not found')
    }

    // Verify credential exists for user
    const { data: credential, error: credError } = await supabaseClient
      .from('webauthn_credentials')
      .select('*')
      .eq('user_id', user.id)
      .eq('credential_id', credentialId)
      .single()

    if (credError || !credential) {
      throw new Error('Invalid credential')
    }

    // Update last used timestamp
    await supabaseClient
      .from('webauthn_credentials')
      .update({ last_used_at: new Date().toISOString() })
      .eq('id', credential.id)

    // Generate session token
    const { data: session, error: sessionError } = await supabaseClient.auth.admin.generateLink({
      type: 'magiclink',
      email: user.email!,
    })

    if (sessionError) throw sessionError

    return new Response(
      JSON.stringify({ success: true, user, accessToken: session }),
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