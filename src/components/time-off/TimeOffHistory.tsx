
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

type TimeOffRecord = {
  id: string;
  startDate: Date;
  endDate: Date;
  status: "approved" | "pending" | "rejected";
  reason: string;
};

type TimeOffHistoryProps = {
  records: TimeOffRecord[];
};

const TimeOffHistory = ({ records }: TimeOffHistoryProps) => {
  const statusColors = {
    approved: "bg-green-100 text-green-700",
    pending: "bg-amber-100 text-amber-700",
    rejected: "bg-red-100 text-red-700",
  };

  const formatDateRange = (start: Date, end: Date) => {
    if (start.toDateString() === end.toDateString()) {
      return format(start, "MMM d, yyyy");
    }
    return `${format(start, "MMM d")} - ${format(end, "MMM d, yyyy")}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Time Off History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {records.length > 0 ? (
            records.map((record) => (
              <div
                key={record.id}
                className="p-4 border rounded-md hover:bg-hr-gray-100 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{formatDateRange(record.startDate, record.endDate)}</p>
                    <p className="text-sm text-hr-gray-500 mt-1">{record.reason}</p>
                  </div>
                  <div className={`px-2 py-1 text-xs rounded-full ${statusColors[record.status]}`}>
                    {record.status}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-hr-gray-500 py-6">
              No time off records found
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeOffHistory;
