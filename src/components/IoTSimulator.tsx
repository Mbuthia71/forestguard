import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Radio, Thermometer, Droplets, Volume2, Eye, Battery } from "lucide-react";
import { useIoTSimulator } from "@/hooks/useIoTSimulator";
import { motion, AnimatePresence } from "framer-motion";

const IoTSimulator = () => {
  const [isRunning, setIsRunning] = useState(false);
  const { readings } = useIoTSimulator(isRunning);

  return (
    <section className="py-24 bg-gradient-to-b from-background to-forest-deep/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Live <span className="text-primary">IoT Simulator</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto mb-6">
            Watch real-time data streaming from LoRaWAN sensor nodes deployed across protected forest zones.
          </p>
          <Button
            size="lg"
            onClick={() => setIsRunning(!isRunning)}
            className={`${
              isRunning ? "bg-destructive hover:bg-destructive/90" : "bg-primary hover-glow"
            } text-primary-foreground`}
          >
            {isRunning ? (
              <>
                <Pause className="mr-2" size={20} />
                Stop Simulator
              </>
            ) : (
              <>
                <Play className="mr-2" size={20} />
                Start Simulator
              </>
            )}
          </Button>
        </div>

        <div className="max-w-6xl mx-auto space-y-4">
          <AnimatePresence mode="popLayout">
            {readings.map((reading, index) => (
              <motion.div
                key={`${reading.node_id}-${index}`}
                initial={{ opacity: 0, x: -50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 50, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <Card className="bg-card/80 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Node Info */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Radio className="text-primary w-5 h-5 animate-pulse" />
                        <span className="font-bold text-foreground">{reading.node_id}</span>
                      </div>
                      <p className="text-sm text-foreground/70">{reading.location}</p>
                      <div className="flex items-center space-x-2">
                        <Battery
                          className={`w-4 h-4 ${
                            reading.battery_level > 70 ? "text-primary" : "text-destructive"
                          }`}
                        />
                        <span className="text-sm">{reading.battery_level}%</span>
                      </div>
                    </div>

                    {/* Environmental Data */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Thermometer className="text-primary w-4 h-4" />
                        <span className="text-sm font-medium">Temp:</span>
                        <span className="text-sm">{reading.temperature.toFixed(1)}°C</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Droplets className="text-primary w-4 h-4" />
                        <span className="text-sm font-medium">Humidity:</span>
                        <span className="text-sm">{reading.humidity.toFixed(1)}%</span>
                      </div>
                    </div>

                    {/* Detection Status */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Volume2 className="text-primary w-4 h-4" />
                        <span className="text-sm font-medium">Sound:</span>
                        <Badge
                          variant={reading.sound_detected ? "destructive" : "secondary"}
                          className="text-xs"
                        >
                          {reading.sound_detected ? "Detected" : "Normal"}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Eye className="text-primary w-4 h-4" />
                        <span className="text-sm font-medium">Motion:</span>
                        <Badge
                          variant={reading.motion_detected ? "destructive" : "secondary"}
                          className="text-xs"
                        >
                          {reading.motion_detected ? "Detected" : "Normal"}
                        </Badge>
                      </div>
                    </div>

                    {/* Signal Quality */}
                    <div className="flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          {reading.signal_strength} dBm
                        </div>
                        <p className="text-xs text-foreground/60">Signal Strength</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          {readings.length === 0 && (
            <Card className="bg-card/50 border-border p-12 text-center">
              <p className="text-foreground/60">
                {isRunning ? "Waiting for sensor data..." : "Start the simulator to see live IoT data"}
              </p>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default IoTSimulator;
