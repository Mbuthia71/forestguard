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
      console.log('[Voice] Generating AI summary for', forestName);
      
      // Step 1: Generate AI summary using Lovable AI
      const { data: summaryData, error: summaryError } = await supabase.functions.invoke(
        'ai-satellite-summary',
        {
          body: { forestName, satelliteData }
        }
      );

      if (summaryError) {
        console.error('[Voice] Summary error:', summaryError);
        throw new Error(`Failed to generate summary: ${summaryError.message}`);
      }

      if (!summaryData?.summary) {
        throw new Error('No summary generated');
      }
      
      const generatedSummary = summaryData.summary;
      console.log('[Voice] Summary generated:', generatedSummary.substring(0, 100) + '...');
      setSummary(generatedSummary);

      // Step 2: Use browser's built-in speech synthesis (no API key needed)
      if ('speechSynthesis' in window) {
        console.log('[Voice] Using browser speech synthesis');
        
        const utterance = new SpeechSynthesisUtterance(generatedSummary);
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        
        // Try to use a high-quality voice
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => 
          v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Microsoft'))
        ) || voices.find(v => v.lang.startsWith('en'));
        
        if (preferredVoice) {
          utterance.voice = preferredVoice;
          console.log('[Voice] Using voice:', preferredVoice.name);
        }
        
        setIsPlaying(true);
        
        utterance.onend = () => {
          console.log('[Voice] Playback completed');
          setIsPlaying(false);
        };
        
        utterance.onerror = (event) => {
          console.error('[Voice] Speech synthesis error:', event);
          setIsPlaying(false);
          toast({
            title: "Playback Error",
            description: "Failed to play voice summary",
            variant: "destructive",
          });
        };
        
        window.speechSynthesis.speak(utterance);
        
        toast({
          title: "AI Voice Summary Playing",
          description: "Satellite analysis voice-over started",
        });
      } else {
        throw new Error('Speech synthesis not supported in this browser');
      }

    } catch (error) {
      console.error('[Voice] Error generating voiceover:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate AI voice summary",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const stopPlayback = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      console.log('[Voice] Playback stopped by user');
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
        <div className="flex gap-2 shrink-0">
          {isPlaying && (
            <Button
              onClick={stopPlayback}
              variant="outline"
              size="sm"
            >
              Stop
            </Button>
          )}
          <Button
            onClick={generateAndPlayVoiceover}
            disabled={isGenerating || isPlaying}
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
      </div>
    </Card>
  );
};
