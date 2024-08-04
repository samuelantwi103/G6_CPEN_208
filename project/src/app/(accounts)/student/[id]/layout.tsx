"use client";
import { FC, ReactNode, useState } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import { Menu, X } from 'lucide-react';

interface AuthLayoutProps {
    children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-full bg-gray-100">
      {/* Sidebar Toggle Button (visible on mobile) */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 bg-blue-100 left-4 z-50 md:hidden  text-white p-2 rounded-md shadow-md"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`
        w-64 bg-blue-100 text-blue-800 fixed inset-y-0 left-0 z-40
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0
      `}>
        
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Overlay to close sidebar on mobile when clicked outside */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={toggleSidebar}
          ></div>
        )}
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;