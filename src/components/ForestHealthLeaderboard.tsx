import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { KENYAN_FORESTS } from "@/data/forests";
import { motion } from "framer-motion";

const ForestHealthLeaderboard = () => {
  // Sort forests by health index
  const sortedForests = [...KENYAN_FORESTS].sort((a, b) => b.healthIndex - a.healthIndex);

  const getTrendIcon = (index: number) => {
    if (index < 3) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (index >= sortedForests.length - 3) return <TrendingDown className="w-4 h-4 text-amber-500" />;
    return <Minus className="w-4 h-4 text-muted-foreground" />;
  };

  const getHealthColor = (health: number) => {
    if (health >= 90) return "text-green-500";
    if (health >= 75) return "text-lime-500";
    if (health >= 60) return "text-amber-500";
    return "text-destructive";
  };

  const getMedalIcon = (index: number) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return null;
  };

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" />
          <CardTitle className="text-xl">Forest Health Leaderboard</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Live rankings of monitored forests based on vegetation health, alert frequency, and ranger activity
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {sortedForests.map((forest, index) => (
            <motion.div
              key={forest.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`flex items-center justify-between p-4 rounded-lg border ${
                index < 3 ? "border-primary/30 bg-primary/5" : "border-border bg-muted/30"
              } hover:border-primary/50 transition-all duration-300`}
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted font-bold">
                  {getMedalIcon(index) || `#${index + 1}`}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{forest.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {forest.lastUpdate}
                    </Badge>
                    {getTrendIcon(index)}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className={`text-2xl font-bold ${getHealthColor(forest.healthIndex)}`}>
                    {forest.healthIndex}
                  </div>
                  <div className="text-xs text-muted-foreground">Health Score</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h5 className="font-semibold mb-2 text-sm">How Health Scores Are Calculated:</h5>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• 40% - Satellite NDVI trends (vegetation health)</li>
            <li>• 30% - Alert frequency reduction</li>
            <li>• 20% - Ranger activity coverage</li>
            <li>• 10% - Community report verification rate</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ForestHealthLeaderboard;
