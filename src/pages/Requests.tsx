
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

type RequestData = {
  id: string;
  type: "schedule-change" | "time-off" | "overtime";
  date: Date;
  details: string;
  status: "pending" | "approved" | "rejected";
};

const sampleRequests: RequestData[] = [
  {
    id: "1",
    type: "schedule-change",
    date: new Date(2025, 4, 20), // May 20, 2025
    details: "Change shift from morning to evening on May 23",
    status: "pending",
  },
  {
    id: "2",
    type: "overtime",
    date: new Date(2025, 4, 15), // May 15, 2025
    details: "Request for 3 hours overtime on project deadline",
    status: "approved",
  },
];

const Requests = () => {
  const { toast } = useToast();

  const handleCancelRequest = (id: string) => {
    toast({
      title: "Request Cancelled",
      description: `Request #${id} has been cancelled.`,
    });
  };

  const getRequestTypeLabel = (type: string) => {
    switch (type) {
      case "schedule-change":
        return "Schedule Change";
      case "time-off":
        return "Time Off";
      case "overtime":
        return "Overtime";
      default:
        return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-amber-100 text-amber-700";
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <DashboardHeader title="My Requests" />
      <div className="flex-1 overflow-y-auto p-6 bg-hr-gray-100">
        <div className="max-w-5xl mx-auto space-y-6 animate-in">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Recent Requests</CardTitle>
                <Button variant="outline">New Request</Button>
              </div>
            </CardHeader>
            <CardContent>
              {sampleRequests.length > 0 ? (
                <div className="space-y-4">
                  {sampleRequests.map((request) => (
                    <div
                      key={request.id}
                      className="p-4 border rounded-md hover:bg-hr-gray-100 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm bg-hr-blue-light text-hr-blue px-2 py-0.5 rounded">
                              {getRequestTypeLabel(request.type)}
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(request.status)}`}>
                              {request.status}
                            </span>
                          </div>
                          <p className="mt-2 font-medium">{request.details}</p>
                          <p className="text-sm text-hr-gray-500 mt-1">
                            Submitted on {format(request.date, "MMMM d, yyyy")}
                          </p>
                        </div>
                        {request.status === "pending" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 mt-2 md:mt-0"
                            onClick={() => handleCancelRequest(request.id)}
                          >
                            Cancel Request
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-hr-gray-500 py-10">
                  No requests found
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Requests;
