
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type TimeOffRequestProps = {
  onRequestSubmit: (startDate: Date, endDate: Date | undefined, reason: string) => void;
};

const TimeOffRequest = ({ onRequestSubmit }: TimeOffRequestProps) => {
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to?: Date;
  }>({
    from: new Date(),
    to: undefined,
  });
  
  const [reason, setReason] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!dateRange.from) {
      toast({
        title: "Error",
        description: "Please select a start date",
        variant: "destructive",
      });
      return;
    }
    
    onRequestSubmit(dateRange.from, dateRange.to, reason);
    
    // Reset form
    setDateRange({ from: new Date(), to: undefined });
    setReason("");
    
    toast({
      title: "Success",
      description: "Your time off request has been submitted",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Request Time Off</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-hr-gray-600 mb-2">
                Select Date Range
              </label>
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={(range) => range && setDateRange(range)}
                className="rounded-md border p-3 pointer-events-auto"
                disabled={(date) => date < new Date()}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-hr-gray-600 mb-2">
                Reason
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-hr-blue-light"
                rows={3}
                placeholder="Briefly describe your reason for requesting time off"
              ></textarea>
            </div>
          </div>
          <div className="mt-6">
            <Button type="submit" className="w-full bg-hr-blue hover:bg-hr-blue-dark">
              Submit Request
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default TimeOffRequest;
