
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

type TimeSlot = {
  id: string;
  startTime: string;
  endTime: string;
  task: string;
  status: "scheduled" | "break" | "completed";
};

type DayScheduleProps = {
  date: Date;
  schedule: TimeSlot[];
};

const DaySchedule = ({ date, schedule }: DayScheduleProps) => {
  const statusColors = {
    scheduled: "bg-hr-blue-light text-hr-blue",
    break: "bg-hr-gray-100 text-hr-gray-600",
    completed: "bg-green-100 text-green-700",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          Schedule for {format(date, "EEEE, MMMM do")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {schedule.length > 0 ? (
            schedule.map((slot) => (
              <div
                key={slot.id}
                className="flex items-center p-3 border rounded-md hover:bg-hr-gray-100 transition-colors"
              >
                <div className="flex-shrink-0 w-20 text-sm text-hr-gray-500">
                  {slot.startTime} - {slot.endTime}
                </div>
                <div className="flex-grow ml-4">
                  <p className="font-medium">{slot.task}</p>
                </div>
                <div className={`px-2 py-1 text-xs rounded-full ${statusColors[slot.status]}`}>
                  {slot.status}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-hr-gray-500 py-6">
              No schedule for this day
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DaySchedule;
