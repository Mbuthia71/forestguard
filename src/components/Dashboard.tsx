import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, MapPin, Clock } from "lucide-react";

const Dashboard = () => {
  const alerts = [
    {
      id: 1,
      severity: "high",
      location: "Amazon Basin, Brazil",
      type: "Satellite Detection",
      time: "2 mins ago",
    },
    {
      id: 2,
      severity: "medium",
      location: "Congo Basin, DRC",
      type: "IoT Sensor",
      time: "15 mins ago",
    },
    {
      id: 3,
      severity: "high",
      location: "Borneo, Indonesia",
      type: "Community Report",
      time: "1 hour ago",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-forest-deep/50 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Live <span className="text-primary">Alert Dashboard</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Real-time monitoring and alerts from satellite imagery, IoT sensors, and community reports.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
          <Card className="bg-card/50 backdrop-blur-sm border-border p-6 hover-glow">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">247</div>
              <div className="text-sm text-foreground/70">Forests Monitored</div>
            </div>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm border-border p-6 hover-glow">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">5,342</div>
              <div className="text-sm text-foreground/70">Alerts Sent</div>
            </div>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm border-border p-6 hover-glow">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">1,234</div>
              <div className="text-sm text-foreground/70">Reports Verified</div>
            </div>
          </Card>
        </div>

        {/* Recent Alerts */}
        <div className="max-w-4xl mx-auto space-y-4">
          <h3 className="text-2xl font-bold text-foreground mb-6">Recent Alerts</h3>
          {alerts.map((alert) => (
            <Card
              key={alert.id}
              className="bg-card border-border hover:border-primary/50 transition-all duration-300 p-6 hover-glow animate-fade-in"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start space-x-4">
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                      alert.severity === "high" ? "bg-destructive/20" : "bg-primary/20"
                    }`}
                  >
                    <AlertTriangle
                      className={alert.severity === "high" ? "text-destructive" : "text-primary"}
                      size={24}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={alert.severity === "high" ? "destructive" : "default"}
                        className="uppercase text-xs"
                      >
                        {alert.severity}
                      </Badge>
                      <span className="text-xs text-foreground/60">{alert.type}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-foreground">
                      <MapPin size={16} className="text-primary" />
                      <span className="font-semibold">{alert.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-foreground/60">
                  <Clock size={16} />
                  <span>{alert.time}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
