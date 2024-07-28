"use client";
import React from "react";
import {
  LayoutDashboard,
  CircleUser,
  Wallet,
  Book,
  LucideIcon,
  LogOutIcon,
} from "lucide-react";
import SidebarItem from "@/components/sidebar/item";
import { useParams } from "next/navigation";

interface SidebarItem {
  name: string;
  icon: LucideIcon;
  path: string;
  items?: SubItem[];
}

interface SubItem {
  name: string;
  path: string;
}

const Sidebar = () => {
  const params = useParams();

  const itemsTop: SidebarItem[] = [
    {
      name: "Dashboard",
      path: `/student/${params.id}`,
      icon: LayoutDashboard,
    },
    {
      name: "Courses",
      path: `/student/${params.id}/courses`,
      icon: Book,
    },
    {
      name: "Finance info",
      path: `/student/${params.id}/finance`,
      icon: Wallet,
    },
  ];

  const itemsBottom: SidebarItem[] = [
    {
      name: "Profile",
      path: `/student/${params.id}/profile`,
      icon: CircleUser,
    },
    {
      name: "Log out",
      path: "/",
      icon: LogOutIcon,
    },
  ];

  return (
    <div className="flex flex-col top-0 z-[40] h-screen sticky">
      <div className="p-5">
        <h2 className="text-2xl font-bold ">University of Ghana</h2>
      </div>
      <nav className="flex flex-col flex-grow justify-between w-full h-[calc(100vh-150px)]">
        <div className="flex flex-col space-y-2 bg-green">
          {itemsTop.map((item) => (
            <SidebarItem key={item.path} item={item} />
          ))}
        </div>
        <div className="flex flex-col space-y-2 bg-green mb-6">
          {itemsBottom.map((item) => (
            <SidebarItem key={item.path} item={item} />
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;