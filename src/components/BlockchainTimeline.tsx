import { CheckCircle, Clock, AlertCircle, XCircle } from "lucide-react";
import { format } from "date-fns";

interface TimelineItem {
  status: string;
  timestamp: string;
  notes?: string;
  takenBy?: string;
}

interface BlockchainTimelineProps {
  createdAt: string;
  actionStatus: string;
  actionTimestamp?: string;
  actionNotes?: string;
  actionTakenBy?: string;
}

export function BlockchainTimeline({
  createdAt,
  actionStatus,
  actionTimestamp,
  actionNotes,
  actionTakenBy,
}: BlockchainTimelineProps) {
  const getStatusIcon = (status: string, isCurrent: boolean) => {
    const className = `w-5 h-5 ${isCurrent ? 'text-primary' : 'text-muted-foreground'}`;
    
    switch (status) {
      case 'received':
        return <Clock className={className} />;
      case 'under_review':
        return <AlertCircle className={className} />;
      case 'in_progress':
        return <Clock className={`${className} animate-pulse`} />;
      case 'resolved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'ignored':
        return <XCircle className="w-5 h-5 text-muted-foreground" />;
      default:
        return <Clock className={className} />;
    }
  };

  const statuses = [
    { key: 'received', label: 'Received' },
    { key: 'under_review', label: 'Under Review' },
    { key: 'in_progress', label: 'In Progress' },
    { key: 'resolved', label: 'Resolved' },
  ];

  const getCurrentStatusIndex = () => {
    const index = statuses.findIndex(s => s.key === actionStatus);
    return index === -1 ? 0 : index;
  };

  const currentIndex = getCurrentStatusIndex();

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium text-muted-foreground mb-4">Transaction Lifecycle</div>
      
      {statuses.map((status, index) => {
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;
        const isLast = index === statuses.length - 1;

        return (
          <div key={status.key} className="relative">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                isCompleted ? 'bg-primary/10 border-primary' :
                isCurrent ? 'bg-primary/20 border-primary' :
                'bg-muted border-muted'
              }`}>
                {getStatusIcon(status.key, isCurrent || isCompleted)}
              </div>

              {/* Content */}
              <div className="flex-1 pb-8">
                <div className="font-medium">{status.label}</div>
                
                {isCurrent && actionTimestamp && (
                  <div className="text-sm text-muted-foreground mt-1">
                    {format(new Date(actionTimestamp), 'PPpp')}
                  </div>
                )}
                
                {index === 0 && (
                  <div className="text-sm text-muted-foreground mt-1">
                    {format(new Date(createdAt), 'PPpp')}
                  </div>
                )}

                {isCurrent && actionNotes && (
                  <div className="mt-2 p-3 bg-muted/50 rounded-lg text-sm">
                    <div className="font-medium mb-1">Action Notes:</div>
                    <div className="text-muted-foreground">{actionNotes}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Connector Line */}
            {!isLast && (
              <div className={`absolute left-5 top-10 w-0.5 h-full ${
                isCompleted ? 'bg-primary' : 'bg-muted'
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
