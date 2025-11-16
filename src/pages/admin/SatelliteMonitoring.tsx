import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Satellite, MapPin, AlertTriangle } from 'lucide-react';

export default function SatelliteMonitoring() {
  const forestLocations = [
    { name: 'Kakamega Forest', status: 'Stable', coverage: '92.3%', color: 'green' },
    { name: 'Mau Forest Complex', status: 'At Risk', coverage: '78.5%', color: 'orange' },
    { name: 'Aberdare Forest', status: 'Healthy', coverage: '89.7%', color: 'green' },
    { name: 'Karura Forest', status: 'Stable', coverage: '95.1%', color: 'green' },
  ];

  const satelliteImages = [
    { title: 'Bushfire Hotspots - Mau Forest', date: '2025-01-10', severity: 'High' },
    { title: 'Tree Cover Change - Kakamega', date: '2025-01-08', severity: 'Medium' },
    { title: 'Encroachment Zones - Karura', date: '2025-01-05', severity: 'Low' },
    { title: 'Yala Ecosystem Water Bodies', date: '2025-01-03', severity: 'Medium' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Satellite Monitoring <span className="text-primary">Kenya</span>
        </h1>
        <p className="text-foreground/70">
          Real-time satellite intelligence for Kenyan forests
        </p>
      </div>

      {/* Forest Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {forestLocations.map((forest, index) => (
          <Card key={index} className="p-6 bg-card/50 backdrop-blur-sm border-border">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">{forest.name}</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground/60">Tree Cover</span>
                <span className="font-semibold text-foreground">{forest.coverage}</span>
              </div>
              <Badge
                className={
                  forest.color === 'green'
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-orange-500/20 text-orange-400'
                }
              >
                {forest.status}
              </Badge>
            </div>
          </Card>
        ))}
      </div>

      {/* Satellite Viewer - Embedded */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
        <div className="flex items-center gap-3 mb-4">
          <Satellite className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Live Satellite Viewer</h2>
        </div>
        <div className="rounded-lg overflow-hidden border border-border">
          <iframe
            src="https://apps.sentinel-hub.com/eo-browser/?zoom=10&lat=-0.3&lng=36.0&themeId=DEFAULT-THEME"
            className="w-full h-[600px]"
            title="Sentinel Hub EO Browser - Kenya Forests"
          />
        </div>
        <p className="text-sm text-foreground/60 mt-4">
          View real-time satellite imagery of Kakamega, Mau, Karura, and Aberdare forests using Sentinel Hub
        </p>
      </Card>

      {/* Latest Satellite Images Gallery */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Latest Satellite Analysis</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {satelliteImages.map((image, index) => (
            <div
              key={index}
              className="p-6 bg-background/50 rounded-lg border border-border hover:shadow-lg transition-shadow"
            >
              <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                <Satellite className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{image.title}</h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground/60">{image.date}</span>
                <Badge
                  variant={image.severity === 'High' ? 'destructive' : 'outline'}
                  className={
                    image.severity === 'High'
                      ? ''
                      : image.severity === 'Medium'
                      ? 'bg-orange-500/20 text-orange-400'
                      : 'bg-blue-500/20 text-blue-400'
                  }
                >
                  {image.severity}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
