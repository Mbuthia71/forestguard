import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Activity, Battery, MapPin, Radio } from 'lucide-react';

export default function LiveSensorMap() {
  const [sensors, setSensors] = useState<any[]>([]);

  useEffect(() => {
    fetchSensors();
  }, []);

  const fetchSensors = async () => {
    const { data } = await supabase
      .from('sensors_kenya')
      .select('*')
      .order('created_at', { ascending: false });
    setSensors(data || []);
  };

  const getSensorIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'acoustic':
        return Radio;
      case 'motion':
        return Activity;
      default:
        return MapPin;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Live Sensor <span className="text-primary">Map</span> (Kenya)
        </h1>
        <p className="text-foreground/70">
          Real-time sensor deployments across Kenyan forests
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sensors.map((sensor) => {
          const SensorIcon = getSensorIcon(sensor.sensor_type);
          const isActive = sensor.status === 'active';
          const batteryLow = sensor.battery_level < 20;

          return (
            <Card
              key={sensor.id}
              className="p-6 bg-card/50 backdrop-blur-sm border-border hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      isActive ? 'bg-green-500/10' : 'bg-red-500/10'
                    }`}
                  >
                    <SensorIcon
                      className={`w-5 h-5 ${
                        isActive ? 'text-green-500' : 'text-red-500'
                      }`}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{sensor.zone_name}</p>
                    <p className="text-xs text-foreground/60">{sensor.forest_name}</p>
                  </div>
                </div>
                <Badge
                  variant={isActive ? 'default' : 'destructive'}
                  className={isActive ? 'bg-green-500/20 text-green-400' : ''}
                >
                  {sensor.status}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-foreground/70">{sensor.gps_location}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Activity className="w-4 h-4 text-primary" />
                  <span className="text-foreground/70">
                    Type: <strong>{sensor.sensor_type}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Battery
                    className={`w-4 h-4 ${batteryLow ? 'text-red-500' : 'text-primary'}`}
                  />
                  <span className="text-foreground/70">
                    Battery: <strong>{sensor.battery_level}%</strong>
                  </span>
                </div>

                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-xs text-foreground/50">{sensor.purpose}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
