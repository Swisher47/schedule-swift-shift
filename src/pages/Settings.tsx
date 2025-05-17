
import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const [preferredWorkHours, setPreferredWorkHours] = useState({
    monday: { start: "09:00", end: "17:00" },
    tuesday: { start: "09:00", end: "17:00" },
    wednesday: { start: "09:00", end: "17:00" },
    thursday: { start: "09:00", end: "17:00" },
    friday: { start: "09:00", end: "17:00" },
    saturday: { start: "", end: "" },
    sunday: { start: "", end: "" },
  });

  const [notifications, setNotifications] = useState({
    scheduleChanges: true,
    requestUpdates: true,
    reminders: true,
  });

  const { toast } = useToast();

  const handleWorkHoursChange = (
    day: keyof typeof preferredWorkHours,
    field: "start" | "end",
    value: string
  ) => {
    setPreferredWorkHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  const handleNotificationChange = (
    setting: keyof typeof notifications,
    value: boolean
  ) => {
    setNotifications((prev) => ({
      ...prev,
      [setting]: value,
    }));
  };

  const handleSaveWorkHours = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferred work hours have been updated.",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Settings Saved",
      description: "Your notification preferences have been updated.",
    });
  };

  const days = [
    { key: "monday", label: "Monday" },
    { key: "tuesday", label: "Tuesday" },
    { key: "wednesday", label: "Wednesday" },
    { key: "thursday", label: "Thursday" },
    { key: "friday", label: "Friday" },
    { key: "saturday", label: "Saturday" },
    { key: "sunday", label: "Sunday" },
  ] as const;

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <DashboardHeader title="Settings" />
      <div className="flex-1 overflow-y-auto p-6 bg-hr-gray-100">
        <div className="max-w-5xl mx-auto space-y-6 animate-in">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Preferred Work Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {days.map((day) => (
                  <div
                    key={day.key}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center"
                  >
                    <div className="font-medium">{day.label}</div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-sm text-hr-gray-500 mb-1">
                          Start Time
                        </label>
                        <input
                          type="time"
                          value={preferredWorkHours[day.key].start}
                          onChange={(e) =>
                            handleWorkHoursChange(day.key, "start", e.target.value)
                          }
                          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-hr-blue-light"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-hr-gray-500 mb-1">
                          End Time
                        </label>
                        <input
                          type="time"
                          value={preferredWorkHours[day.key].end}
                          onChange={(e) =>
                            handleWorkHoursChange(day.key, "end", e.target.value)
                          }
                          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-hr-blue-light"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <div className="pt-4">
                  <Button
                    onClick={handleSaveWorkHours}
                    className="bg-hr-blue hover:bg-hr-blue-dark"
                  >
                    Save Work Hours
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Schedule Changes</p>
                    <p className="text-sm text-hr-gray-500">
                      Get notified when your schedule is changed
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={notifications.scheduleChanges}
                      onChange={(e) =>
                        handleNotificationChange(
                          "scheduleChanges",
                          e.target.checked
                        )
                      }
                    />
                    <div className="w-11 h-6 bg-hr-gray-300 rounded-full peer peer-checked:bg-hr-blue peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-hr-blue-light"></div>
                    <span className="absolute left-1 bg-white w-4 h-4 rounded-full transition-all duration-200 peer-checked:translate-x-5"></span>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Request Updates</p>
                    <p className="text-sm text-hr-gray-500">
                      Get notified when your requests are processed
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={notifications.requestUpdates}
                      onChange={(e) =>
                        handleNotificationChange(
                          "requestUpdates",
                          e.target.checked
                        )
                      }
                    />
                    <div className="w-11 h-6 bg-hr-gray-300 rounded-full peer peer-checked:bg-hr-blue peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-hr-blue-light"></div>
                    <span className="absolute left-1 bg-white w-4 h-4 rounded-full transition-all duration-200 peer-checked:translate-x-5"></span>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Schedule Reminders</p>
                    <p className="text-sm text-hr-gray-500">
                      Get daily reminders about your schedule
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={notifications.reminders}
                      onChange={(e) =>
                        handleNotificationChange("reminders", e.target.checked)
                      }
                    />
                    <div className="w-11 h-6 bg-hr-gray-300 rounded-full peer peer-checked:bg-hr-blue peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-hr-blue-light"></div>
                    <span className="absolute left-1 bg-white w-4 h-4 rounded-full transition-all duration-200 peer-checked:translate-x-5"></span>
                  </label>
                </div>

                <div className="pt-4">
                  <Button
                    onClick={handleSaveNotifications}
                    className="bg-hr-blue hover:bg-hr-blue-dark"
                  >
                    Save Notification Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
