
import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import TimeOffRequest from "@/components/time-off/TimeOffRequest";
import TimeOffHistory from "@/components/time-off/TimeOffHistory";

// Sample time off history data
const initialTimeOffRecords = [
  {
    id: "1",
    startDate: new Date(2025, 0, 2), // January 2, 2025
    endDate: new Date(2025, 0, 3), // January 3, 2025
    status: "approved" as const,
    reason: "Personal days",
  },
  {
    id: "2",
    startDate: new Date(2025, 2, 10), // March 10, 2025
    endDate: new Date(2025, 2, 14), // March 14, 2025
    status: "approved" as const,
    reason: "Family vacation",
  },
];

const TimeOff = () => {
  const [timeOffRecords, setTimeOffRecords] = useState(initialTimeOffRecords);

  const handleRequestSubmit = (startDate: Date, endDate: Date | undefined, reason: string) => {
    const newRecord = {
      id: `${timeOffRecords.length + 1}`,
      startDate,
      endDate: endDate || startDate,
      status: "pending" as const,
      reason,
    };
    
    setTimeOffRecords([newRecord, ...timeOffRecords]);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <DashboardHeader title="Time Off" />
      <div className="flex-1 overflow-y-auto p-6 bg-hr-gray-100">
        <div className="max-w-7xl mx-auto space-y-6 animate-in">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <TimeOffRequest onRequestSubmit={handleRequestSubmit} />
            </div>
            <div className="lg:col-span-2">
              <TimeOffHistory records={timeOffRecords} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeOff;
