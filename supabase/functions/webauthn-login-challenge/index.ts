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
    const { email } = await req.json()

    if (!email) {
      throw new Error('Email is required')
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

    // Get user's credentials
    const { data: credentials, error: credError } = await supabaseClient
      .from('webauthn_credentials')
      .select('credential_id')
      .eq('user_id', user.id)

    if (credError) throw credError
    if (!credentials || credentials.length === 0) {
      throw new Error('No biometric credentials found for this user')
    }

    // Generate challenge
    const challenge = new Uint8Array(32)
    crypto.getRandomValues(challenge)
    const challengeBase64 = btoa(String.fromCharCode(...challenge))

    const publicKeyCredentialRequestOptions = {
      challenge: challengeBase64,
      allowCredentials: credentials.map(c => ({
        id: c.credential_id,
        type: 'public-key',
        transports: ['internal'],
      })),
      timeout: 60000,
      userVerification: 'required',
      rpId: new URL(req.headers.get('origin') || 'https://'+(Deno.env.get('SUPABASE_URL')||'')).hostname,
    }

    return new Response(
      JSON.stringify(publicKeyCredentialRequestOptions),
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