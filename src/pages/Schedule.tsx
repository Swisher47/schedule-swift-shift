
import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ScheduleCalendar from "@/components/schedule/ScheduleCalendar";
import DaySchedule from "@/components/schedule/DaySchedule";
import WeeklyOverview from "@/components/schedule/WeeklyOverview";
import { Button } from "@/components/ui/button";
import { format, addDays, subDays } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Sample schedule data for different dates
const getScheduleForDate = (date: Date) => {
  // This would normally come from an API
  const day = date.getDay(); // 0 is Sunday, 1 is Monday, etc.
  
  if (day === 0 || day === 6) {
    return []; // Weekend - no schedule
  }
  
  return [
    {
      id: "1",
      startTime: "9:00 AM",
      endTime: "10:30 AM",
      task: "Team Standup & Planning",
      status: "scheduled" as const,
    },
    {
      id: "2",
      startTime: "10:30 AM",
      endTime: "12:00 PM",
      task: "Project Development",
      status: "scheduled" as const,
    },
    {
      id: "3",
      startTime: "12:00 PM",
      endTime: "1:00 PM",
      task: "Lunch Break",
      status: "break" as const,
    },
    {
      id: "4",
      startTime: "1:00 PM",
      endTime: "4:00 PM",
      task: "Project Development",
      status: "scheduled" as const,
    },
    {
      id: "5",
      startTime: "4:00 PM",
      endTime: "5:00 PM",
      task: day === 5 ? "Weekly Retrospective" : "Daily Wrap-up",
      status: "scheduled" as const,
    },
  ];
};

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const schedule = getScheduleForDate(selectedDate);
  
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
    }
  };
  
  const goToPreviousDay = () => {
    setSelectedDate(subDays(selectedDate, 1));
  };
  
  const goToNextDay = () => {
    setSelectedDate(addDays(selectedDate, 1));
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <DashboardHeader title="My Schedule" />
      <div className="flex-1 overflow-y-auto p-6 bg-hr-gray-100">
        <div className="max-w-7xl mx-auto space-y-6 animate-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={goToPreviousDay}
              >
                <ChevronLeft size={18} />
              </Button>
              <div className="font-medium">
                {format(selectedDate, "MMMM d, yyyy")}
              </div>
              <Button 
                variant="outline" 
                size="icon"
                onClick={goToNextDay}
              >
                <ChevronRight size={18} />
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline"
                onClick={() => setSelectedDate(new Date())}
              >
                Today
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <DaySchedule date={selectedDate} schedule={schedule} />
            </div>
            <div>
              <ScheduleCalendar onDateSelect={handleDateChange} />
            </div>
          </div>
          
          <div className="mt-6">
            <WeeklyOverview currentDate={selectedDate} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
