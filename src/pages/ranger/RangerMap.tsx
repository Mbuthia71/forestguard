import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function RangerMap() {
  const navigate = useNavigate();

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Button variant="ghost" onClick={() => navigate("/ranger")}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Button>

      <div className="mt-4 bg-muted rounded-lg h-[600px] flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <p className="text-lg">Forest Map View</p>
          <p className="text-sm mt-2">Map integration coming soon</p>
        </div>
      </div>
    </div>
  );
}
