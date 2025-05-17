
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

type ScheduleCalendarProps = {
  onDateSelect: (date: Date | undefined) => void;
};

const ScheduleCalendar = ({ onDateSelect }: ScheduleCalendarProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    onDateSelect(selectedDate);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          className="rounded-md border p-3 pointer-events-auto"
        />
      </CardContent>
    </Card>
  );
};

export default ScheduleCalendar;
