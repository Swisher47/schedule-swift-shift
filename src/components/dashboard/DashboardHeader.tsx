
import { Bell } from "lucide-react";

type DashboardHeaderProps = {
  title: string;
};

const DashboardHeader = ({ title }: DashboardHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-6 border-b border-hr-gray-200 bg-white">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <div className="flex items-center space-x-4">
        <button className="p-2 text-hr-gray-500 hover:text-hr-gray-600 hover:bg-hr-gray-100 rounded-full focus:outline-none">
          <Bell size={20} />
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
