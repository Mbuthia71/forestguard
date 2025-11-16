import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface SensorReading {
  node_id: string;
  location: string;
  temperature: number;
  humidity: number;
  sound_detected: boolean;
  motion_detected: boolean;
  battery_level: number;
  signal_strength: number;
}

const SENSOR_NODES = [
  { id: 'KK-N001', location: 'Kakamega Forest - Isecheno Station' },
  { id: 'KK-N002', location: 'Kakamega Forest - Buyangu Area' },
  { id: 'KK-N003', location: 'Kakamega Forest - Yala River Zone' },
  { id: 'MF-N001', location: 'Mau Forest - Kiptunga Area' },
  { id: 'MF-N002', location: 'Mau Forest - Mau Summit' },
  { id: 'AB-N001', location: 'Aberdare Forest - Kinale Region' },
  { id: 'KR-N001', location: 'Karura Forest - Southern Gate' },
  { id: 'KR-N002', location: 'Karura Forest - Central Trail' },
  { id: 'NG-N001', location: 'Ngong Road Forest Reserve' },
  { id: 'KK-N004', location: 'Kakamega Forest - Bunyala Zone' },
  { id: 'MF-N003', location: 'Mau Forest - Eastern Block' },
  { id: 'AB-N002', location: 'Aberdare Forest - Ndaragwa Region' },
];

export const useIoTSimulator = (isRunning: boolean) => {
  const [readings, setReadings] = useState<SensorReading[]>([]);

  const generateReading = (): SensorReading => {
    const node = SENSOR_NODES[Math.floor(Math.random() * SENSOR_NODES.length)];
    return {
      node_id: node.id,
      location: node.location,
      temperature: 20 + Math.random() * 15,
      humidity: 60 + Math.random() * 30,
      sound_detected: Math.random() > 0.7,
      motion_detected: Math.random() > 0.8,
      battery_level: 60 + Math.floor(Math.random() * 40),
      signal_strength: -80 + Math.floor(Math.random() * 40),
    };
  };

  const sendReading = async (reading: SensorReading) => {
    const { error } = await supabase.from("sensor_data").insert({
      node_id: reading.node_id,
      location: reading.location,
      temperature: reading.temperature,
      humidity: reading.humidity,
      sound_detected: reading.sound_detected,
      motion_detected: reading.motion_detected,
      battery_level: reading.battery_level,
      signal_strength: reading.signal_strength,
    });

    if (error) {
      console.error("Error sending sensor reading:", error);
      return false;
    }

    // Generate alert if conditions warrant it
    if (reading.sound_detected || reading.motion_detected) {
      const alertType = reading.motion_detected && reading.sound_detected 
        ? "Illegal logging activity"
        : reading.sound_detected 
        ? "Chainsaw-like acoustic signature"
        : "Unauthorized movement";
      
      await supabase.from("alerts").insert({
        location: reading.location,
        severity: reading.motion_detected && reading.sound_detected ? "high" : "medium",
        source: "iot_sensor",
        description: `${alertType} detected at ${reading.location}`,
        metadata: {
          node_id: reading.node_id,
          temperature: reading.temperature,
          humidity: reading.humidity,
        },
      });
    }

    return true;
  };

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(async () => {
      const reading = generateReading();
      setReadings((prev) => [reading, ...prev.slice(0, 9)]);
      
      const success = await sendReading(reading);
      if (success && (reading.sound_detected || reading.motion_detected)) {
        const alertType = reading.motion_detected && reading.sound_detected 
          ? "🚨 Illegal Logging Alert"
          : reading.sound_detected 
          ? "🔊 Acoustic Alert"
          : "👤 Movement Alert";
        
        toast({
          title: alertType,
          description: `${reading.location}: Immediate ranger response required`,
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isRunning]);

  return { readings };
};
