import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Volume2, Loader2, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SatelliteAIVoiceoverProps {
  forestName: string;
  satelliteData: {
    vegetationScore?: number | string;
    canopyDensity?: number | string;
    deforestationRate?: number | string;
    lastSAR?: string;
    lastOptical?: string;
  };
}

export const SatelliteAIVoiceover = ({ forestName, satelliteData }: SatelliteAIVoiceoverProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [summary, setSummary] = useState<string>("");
  const { toast } = useToast();

  const generateAndPlayVoiceover = async () => {
    setIsGenerating(true);
    
    try {
      // Step 1: Generate AI summary
      const { data: summaryData, error: summaryError } = await supabase.functions.invoke(
        'ai-satellite-summary',
        {
          body: { forestName, satelliteData }
        }
      );

      if (summaryError) throw summaryError;
      
      const generatedSummary = summaryData.summary;
      setSummary(generatedSummary);

      // Step 2: Convert to speech
      const { data: audioData, error: audioError } = await supabase.functions.invoke(
        'text-to-speech',
        {
          body: { text: generatedSummary, voice: 'alloy' }
        }
      );

      if (audioError) throw audioError;

      // Step 3: Play audio
      const audioBlob = new Blob(
        [Uint8Array.from(atob(audioData.audioContent), c => c.charCodeAt(0))],
        { type: 'audio/mp3' }
      );
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      setIsPlaying(true);
      audio.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };
      
      await audio.play();

      toast({
        title: "AI Voice Summary Generated",
        description: "Playing satellite analysis voice-over",
      });

    } catch (error) {
      console.error('Error generating voiceover:', error);
      toast({
        title: "Error",
        description: "Failed to generate AI voice summary",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg">AI Satellite Analysis Voice-Over</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Get an AI-powered audio summary of satellite imagery analysis for {forestName}
          </p>
          {summary && (
            <div className="p-3 bg-background/50 rounded-md mb-4 text-sm">
              <p className="italic text-foreground/80">{summary}</p>
            </div>
          )}
        </div>
        <Button
          onClick={generateAndPlayVoiceover}
          disabled={isGenerating || isPlaying}
          className="shrink-0"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : isPlaying ? (
            <>
              <Volume2 className="mr-2 h-4 w-4 animate-pulse" />
              Playing...
            </>
          ) : (
            <>
              <Volume2 className="mr-2 h-4 w-4" />
              Generate Voice Summary
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};
