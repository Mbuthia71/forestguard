import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { forestName, satelliteData } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Create a prompt for the AI to summarize satellite data
    const prompt = `You are an expert forest monitoring analyst. Based on the following satellite data for ${forestName}, provide a clear, concise audio-friendly summary (2-3 sentences) of the forest health status, key changes detected, and any areas of concern. 

Satellite Data:
- Vegetation Health Score: ${satelliteData.vegetationScore || 'N/A'}
- Canopy Density: ${satelliteData.canopyDensity || 'N/A'}
- Deforestation Rate: ${satelliteData.deforestationRate || 'N/A'}
- Last SAR Update: ${satelliteData.lastSAR || 'N/A'}
- Last Optical Update: ${satelliteData.lastOptical || 'N/A'}

Provide a professional but accessible summary suitable for audio narration.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { 
            role: "system", 
            content: "You are a forest monitoring expert providing clear, concise audio summaries of satellite data." 
          },
          { role: "user", content: prompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("Failed to generate AI summary");
    }

    const data = await response.json();
    const summary = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ summary }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in ai-satellite-summary:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
