
import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatCard from "@/components/dashboard/StatCard";
import WeeklyOverview from "@/components/schedule/WeeklyOverview";
import DaySchedule from "@/components/schedule/DaySchedule";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, CheckCircle, Briefcase } from "lucide-react";
import { format } from "date-fns";

// Sample schedule data
const todaySchedule = [
  {
    id: "1",
    startTime: "9:00 AM",
    endTime: "10:30 AM",
    task: "Team Standup & Planning",
    status: "completed" as const,
  },
  {
    id: "2",
    startTime: "10:30 AM",
    endTime: "12:00 PM",
    task: "Project Development",
    status: "completed" as const,
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
    task: "Daily Wrap-up",
    status: "scheduled" as const,
  },
];

// Upcoming time off
const upcomingTimeOff = [
  {
    id: "1",
    dates: "May 24 - May 28, 2025",
    status: "approved" as const,
    description: "Family vacation",
  },
];

const Dashboard = () => {
  const today = new Date();

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <DashboardHeader title="Dashboard" />
      <div className="flex-1 overflow-y-auto p-6 bg-hr-gray-100">
        <div className="max-w-7xl mx-auto space-y-6 animate-in">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard
              title="Hours Today"
              value="6.5 / 8"
              icon={<Clock size={20} />}
            />
            <StatCard
              title="Hours This Week"
              value="26 / 40"
              icon={<Briefcase size={20} />}
            />
            <StatCard
              title="Next Time Off"
              value="May 24"
              icon={<Calendar size={20} />}
            />
            <StatCard
              title="Pending Requests"
              value="0"
              icon={<CheckCircle size={20} />}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <DaySchedule
                date={today}
                schedule={todaySchedule}
              />
            </div>
            <div>
              <WeeklyOverview currentDate={today} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Current Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="border rounded-md p-4 bg-white">
                      <p className="text-sm font-medium text-hr-gray-500">Today</p>
                      <p className="mt-1 font-medium">{format(today, "EEEE")}</p>
                      <p className="text-sm text-hr-gray-500">9:00 AM - 5:00 PM</p>
                    </div>
                    <div className="border rounded-md p-4 bg-white">
                      <p className="text-sm font-medium text-hr-gray-500">Tomorrow</p>
                      <p className="mt-1 font-medium">{format(new Date(today.setDate(today.getDate() + 1)), "EEEE")}</p>
                      <p className="text-sm text-hr-gray-500">9:00 AM - 5:00 PM</p>
                    </div>
                    <div className="border rounded-md p-4 bg-white">
                      <p className="text-sm font-medium text-hr-gray-500">Next Day</p>
                      <p className="mt-1 font-medium">{format(new Date(today.setDate(today.getDate() + 1)), "EEEE")}</p>
                      <p className="text-sm text-hr-gray-500">9:00 AM - 5:00 PM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Upcoming Time Off</CardTitle>
                </CardHeader>
                <CardContent>
                  {upcomingTimeOff.length > 0 ? (
                    upcomingTimeOff.map((item) => (
                      <div key={item.id} className="border rounded-md p-4 bg-white">
                        <p className="font-medium">{item.dates}</p>
                        <p className="text-sm text-hr-gray-500 mt-1">{item.description}</p>
                        <p className="mt-2 text-xs inline-block px-2 py-1 bg-green-100 text-green-700 rounded-full">
                          {item.status}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-hr-gray-500 py-4">
                      No upcoming time off
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
