import React from 'react';
import { User, Settings, FileText, LayoutDashboard } from 'lucide-react';

const AdminSidebar = () => {
  return (
    <nav className="bg-white shadow w-64 h-screen fixed left-0 top-0 overflow-y-auto flex flex-col">
      <div className="px-4 py-5 space-y-2 flex-grow">
      <a href="/staff/id" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 rounded p-2">
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </a>
        <a href="#" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 rounded p-2">
          <User size={20} />
          <span>Users</span>
        </a>
        <a href="#" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 rounded p-2">
          <FileText size={20} />
          <span>Reports</span>
        </a>
        <a href="/staff/id/courses" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 rounded p-2">
          <FileText size={20} />
          <span>Courses</span>
        </a>
      </div>
      <div className="px-4 py-5 space-y-2 border-t">
        <a href="#" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 rounded p-2">
          <Settings size={20} />
          <span>Settings</span>
        </a>
        <a href="/staff/id/profile" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 rounded p-2">
          <User size={20} />
          <span>Profile</span>
        </a>
      </div>
    </nav>
  );
};

export default AdminSidebar;