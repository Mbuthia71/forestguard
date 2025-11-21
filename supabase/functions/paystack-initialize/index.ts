import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { amount, email, metadata } = await req.json();

    // Validate input
    if (!amount || amount <= 0) {
      console.error('Invalid amount provided:', amount);
      return new Response(
        JSON.stringify({ error: 'Invalid amount provided' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    if (!email) {
      console.error('Email is required');
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const paystackSecretKey = Deno.env.get('PAYSTACK_SECRET_KEY');
    
    if (!paystackSecretKey) {
      console.error('PAYSTACK_SECRET_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'Payment gateway not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Initializing Paystack transaction:', { 
      amount: amount * 100, // Paystack expects amount in kobo (cents)
      email,
      metadata 
    });

    // Initialize Paystack transaction
    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${paystackSecretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        amount: amount * 100, // Convert to kobo (Paystack uses smallest currency unit)
        currency: 'KES',
        metadata: {
          ...metadata,
          purpose: 'ForestGuard Conservation Donation',
          custom_fields: [
            {
              display_name: "Donation Type",
              variable_name: "donation_type",
              value: metadata?.tier || "Custom Amount"
            }
          ]
        },
        callback_url: `${req.headers.get('origin')}/donate?payment=success`,
        channels: ['card', 'bank', 'mobile_money', 'bank_transfer'],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Paystack initialization failed:', data);
      return new Response(
        JSON.stringify({ error: 'Failed to initialize payment', details: data }),
        { 
          status: response.status, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Paystack transaction initialized successfully:', {
      reference: data.data.reference,
      authorization_url: data.data.authorization_url
    });

    return new Response(
      JSON.stringify({
        success: true,
        authorization_url: data.data.authorization_url,
        access_code: data.data.access_code,
        reference: data.data.reference,
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in paystack-initialize function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error', 
        message: errorMessage 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
