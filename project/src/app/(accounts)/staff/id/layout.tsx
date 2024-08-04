import { FC, ReactNode, useState } from "react";
import AdminSidebar from "@/components/sidebar/AdminSidebar";

interface AuthLayoutProps {
    children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
 

  return (
    <div className="flex">
    <AdminSidebar />
    <main className="flex-1 ml-64 p-4">
      {children}
    </main>
  </div>
  );
};

export default AuthLayout;