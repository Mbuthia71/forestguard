import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch overnight alerts (last 24 hours)
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { data: alerts, error: alertsError } = await supabase
      .from('alerts')
      .select('*')
      .gte('created_at', twentyFourHoursAgo)
      .order('created_at', { ascending: false });

    if (alertsError) throw alertsError;

    // Fetch recent field reports
    const { data: reports, error: reportsError } = await supabase
      .from('field_reports')
      .select('*')
      .gte('created_at', twentyFourHoursAgo)
      .order('created_at', { ascending: false });

    if (reportsError) throw reportsError;

    // Fetch blockchain reports
    const { data: blockchainReports, error: blockchainError } = await supabase
      .from('blockchain_reports')
      .select('*')
      .gte('created_at', twentyFourHoursAgo)
      .order('created_at', { ascending: false });

    if (blockchainError) throw blockchainError;

    // Generate AI summary
    const prompt = `You are a forest monitoring AI assistant generating a daily briefing for Kenya Forest Service officials.

Overnight Data Summary:
- Total Alerts: ${alerts?.length || 0}
- Field Reports Submitted: ${reports?.length || 0}
- Community Reports: ${blockchainReports?.length || 0}

Alert Details:
${alerts?.map(a => `- ${a.severity} alert in ${a.location}: ${a.source}`).join('\n') || 'No alerts'}

Field Reports:
${reports?.map(r => `- Report from ${r.location}: ${r.notes}`).join('\n') || 'No field reports'}

Community Reports:
${blockchainReports?.map(b => `- ${b.location}: ${b.description}`).join('\n') || 'No community reports'}

Generate a concise 2-minute audio-friendly briefing (approximately 250 words) that:
1. Opens with "Good morning, this is your ForestGuard daily briefing for [today's date]"
2. Summarizes key overnight threats and alerts
3. Highlights ranger field activities
4. Notes any community whistleblower reports
5. Provides recommended priority actions for today
6. Ends with "End of briefing. Stay vigilant, protect our forests."

Keep the tone professional, direct, and action-oriented. Focus on actionable intelligence.`;

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: 'You are a forest monitoring AI assistant generating professional daily briefings for government officials.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI Gateway error:', errorText);
      throw new Error(`AI Gateway returned ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const briefingText = aiData.choices[0].message.content;

    // Generate audio using OpenAI TTS
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      // Return text-only briefing if no TTS available
      return new Response(
        JSON.stringify({ 
          briefingText,
          audioAvailable: false 
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const ttsResponse = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'tts-1',
        input: briefingText,
        voice: 'onyx', // Professional male voice for official briefings
        response_format: 'mp3',
      }),
    });

    if (!ttsResponse.ok) {
      console.error('TTS error:', await ttsResponse.text());
      return new Response(
        JSON.stringify({ 
          briefingText,
          audioAvailable: false 
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const arrayBuffer = await ttsResponse.arrayBuffer();
    const base64Audio = btoa(
      String.fromCharCode(...new Uint8Array(arrayBuffer))
    );

    return new Response(
      JSON.stringify({ 
        briefingText,
        audioContent: base64Audio,
        audioAvailable: true,
        alertsCount: alerts?.length || 0,
        reportsCount: reports?.length || 0,
        communityReportsCount: blockchainReports?.length || 0
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error generating daily briefing:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        briefingText: 'Unable to generate briefing at this time.'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
