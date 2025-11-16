import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Satellite, MapPin, AlertTriangle, Globe } from 'lucide-react';

export default function SatelliteMonitoring() {
  const [selectedForest, setSelectedForest] = useState('kakamega');
  const [isLoadingRealtime, setIsLoadingRealtime] = useState(true);
  const [isLoadingHistorical, setIsLoadingHistorical] = useState(true);

  const forests = {
    kakamega: { name: 'Kakamega Forest', lat: -0.290, lng: 34.856, status: 'Stable', coverage: '92.3%', color: 'green' },
    mau: { name: 'Mau Forest Complex', lat: -0.515, lng: 35.699, status: 'At Risk', coverage: '78.5%', color: 'orange' },
    aberdare: { name: 'Aberdare Forest', lat: -0.416, lng: 36.667, status: 'Healthy', coverage: '89.7%', color: 'green' },
    karura: { name: 'Karura Forest', lat: -1.219, lng: 36.825, status: 'Stable', coverage: '95.1%', color: 'green' },
  };

  const forestLocations = Object.values(forests);
  const currentForest = forests[selectedForest as keyof typeof forests];

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

      {/* Forest Selector */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
        <div className="flex items-center gap-3 mb-4">
          <Globe className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Select Forest</h3>
        </div>
        <Select value={selectedForest} onValueChange={setSelectedForest}>
          <SelectTrigger className="w-full md:w-[300px] bg-background">
            <SelectValue placeholder="Choose a forest" />
          </SelectTrigger>
          <SelectContent className="z-50 bg-popover text-popover-foreground shadow-lg">
            <SelectItem value="kakamega">Kakamega Forest</SelectItem>
            <SelectItem value="mau">Mau Forest Complex</SelectItem>
            <SelectItem value="karura">Karura Forest</SelectItem>
            <SelectItem value="aberdare">Aberdare Forest</SelectItem>
          </SelectContent>
        </Select>
      </Card>

      {/* Real-Time Satellite Viewer */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
        <div className="flex items-center gap-3 mb-4">
          <Satellite className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Real-Time Satellite Imagery (Google Earth Engine — {currentForest.name})</h2>
        </div>
        <p className="text-sm text-foreground/60 mb-4">
          Powered by Google Earth Engine Timelapse. View recent imagery without login.
        </p>
        <div className="relative rounded-lg overflow-hidden border border-border">
          {isLoadingRealtime && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80">
              <Skeleton className="w-full h-[60vh] md:h-[650px]" />
            </div>
          )}
          <iframe
            key={`realtime-${selectedForest}`}
            src={`https://earthengine.google.com/timelapse/embed/#v=${currentForest.lat},${currentForest.lng},11,latLng&t=0.00`}
            className="w-full h-[60vh] md:h-[650px]"
            title={`Real-Time Satellite - ${currentForest.name}`}
            onLoad={() => setIsLoadingRealtime(false)}
            loading="lazy"
            style={{ border: 'none', borderRadius: '14px' }}
          />
        </div>
      </Card>

      {/* Historical Forest Change Viewer */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
        <div className="flex items-center gap-3 mb-4">
          <Satellite className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Historical Forest Change (1984–Present)</h2>
        </div>
        <p className="text-sm text-foreground/60 mb-4">
          View long-term deforestation and regeneration trends around{' '}
          <span className="text-primary font-semibold">{currentForest.name}</span> using Google Earth Engine Timelapse.
        </p>
        <div className="relative rounded-lg overflow-hidden border border-border">
          {isLoadingHistorical && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80">
              <Skeleton className="w-full h-[650px]" />
            </div>
          )}
          <iframe
            key={`historical-${selectedForest}`}
            src={`https://earthengine.google.com/timelapse/embed/#v=${currentForest.lat},${currentForest.lng},10,latLng&t=0.00`}
            className="w-full h-[60vh] md:h-[650px]"
            title={`Historical Change - ${currentForest.name}`}
            onLoad={() => setIsLoadingHistorical(false)}
            loading="lazy"
            style={{ border: 'none', borderRadius: '14px', marginTop: '0' }}
          />
        </div>
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
