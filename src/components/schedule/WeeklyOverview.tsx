
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, startOfWeek, addDays } from "date-fns";

type DayScheduleInfo = {
  date: Date;
  hoursWorked: number;
  status: "normal" | "overtime" | "undertime" | "off";
};

type WeeklyOverviewProps = {
  currentDate: Date;
};

// Sample schedule data
const generateWeekData = (startDate: Date): DayScheduleInfo[] => {
  return Array.from({ length: 7 }).map((_, i) => {
    const date = addDays(startDate, i);
    const isWeekend = [0, 6].includes(date.getDay());
    let status: "normal" | "overtime" | "undertime" | "off" = "normal";
    let hoursWorked = 8;
    
    if (isWeekend) {
      status = "off";
      hoursWorked = 0;
    } else if (i === 2) {
      status = "overtime";
      hoursWorked = 10;
    } else if (i === 4) {
      status = "undertime";
      hoursWorked = 6;
    }
    
    return { date, hoursWorked, status };
  });
};

const WeeklyOverview = ({ currentDate }: WeeklyOverviewProps) => {
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekData = generateWeekData(weekStart);
  
  const statusColors = {
    normal: "bg-hr-blue",
    overtime: "bg-amber-500",
    undertime: "bg-hr-blue-light",
    off: "bg-hr-gray-200",
  };
  
  const statusHeight = (hours: number) => {
    if (hours === 0) return "h-2";
    return `h-${Math.min(Math.max(hours * 0.5, 1), 12)}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Weekly Hours</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-end h-48 pt-6">
          {weekData.map((day) => (
            <div key={day.date.toString()} className="flex flex-col items-center space-y-2">
              <div className="w-10">
                <div 
                  className={`${statusColors[day.status]} rounded-t-sm w-full ${statusHeight(day.hoursWorked)}`}
                />
              </div>
              <div className="text-xs font-medium">{format(day.date, "EEE")}</div>
              <div className="text-xs text-hr-gray-500">
                {day.hoursWorked > 0 ? `${day.hoursWorked}h` : "—"}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 border-t pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-hr-gray-500">Week Total</p>
              <p className="font-semibold">
                {weekData.reduce((sum, day) => sum + day.hoursWorked, 0)}h
              </p>
            </div>
            <div>
              <p className="text-xs text-hr-gray-500">Average Daily</p>
              <p className="font-semibold">
                {Math.round(weekData.reduce((sum, day) => sum + day.hoursWorked, 0) / 5)}h
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyOverview;
