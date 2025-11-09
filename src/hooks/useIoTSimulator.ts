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
  { id: "NODE-001", location: "Amazon Sector Alpha" },
  { id: "NODE-002", location: "Congo Basin Beta" },
  { id: "NODE-003", location: "Borneo Gamma" },
  { id: "NODE-004", location: "Amazon Sector Delta" },
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
      await supabase.from("alerts").insert({
        location: reading.location,
        severity: reading.motion_detected && reading.sound_detected ? "high" : "medium",
        source: "iot_sensor",
        description: `IoT Alert: ${reading.motion_detected ? "Motion" : ""} ${
          reading.sound_detected ? "Sound" : ""
        } detected at ${reading.location}`,
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
        toast({
          title: "🚨 IoT Alert Generated",
          description: `${reading.location}: Suspicious activity detected`,
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isRunning]);

  return { readings };
};
