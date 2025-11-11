import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

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

    // Generate a random challenge (32 bytes)
    const challenge = new Uint8Array(32)
    crypto.getRandomValues(challenge)
    const challengeBase64 = btoa(String.fromCharCode(...challenge))

    // Generate a random user ID
    const userId = new Uint8Array(16)
    crypto.getRandomValues(userId)
    const userIdBase64 = btoa(String.fromCharCode(...userId))

    const publicKeyCredentialCreationOptions = {
      challenge: challengeBase64,
      rp: {
        name: "ForestGuard",
        id: new URL(req.headers.get('origin') || 'http://localhost:8080').hostname,
      },
      user: {
        id: userIdBase64,
        name: email,
        displayName: email,
      },
      pubKeyCredParams: [
        { alg: -7, type: "public-key" },  // ES256
        { alg: -257, type: "public-key" } // RS256
      ],
      authenticatorSelection: {
        authenticatorAttachment: "platform",
        userVerification: "required",
        requireResidentKey: false,
      },
      timeout: 60000,
      attestation: "none",
    }

    return new Response(
      JSON.stringify(publicKeyCredentialCreationOptions),
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