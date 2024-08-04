"use client";
import React, { useState } from "react";
import {
  LayoutDashboard,
  CircleUser,
  Wallet,
  Book,
  LucideIcon,
  LogOutIcon,
  ChevronDown,
  ChevronUp,
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
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);

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
      items: [
        { name: "My Courses", path: `/student/${params.id}/courses` },
        { name: "Course Registration", path: `/student/${params.id}/courses/registration` },
      ],
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

  const toggleCourses = () => {
    setIsCoursesOpen(!isCoursesOpen);
  };

  return (
    <div className="flex flex-col top-0 z-[40] h-screen sticky">
      <div className="p-5">
        <h2 className="text-2xl font-bold ">University of Ghana</h2>
      </div>
      <nav className="flex flex-col flex-grow justify-between w-full h-[calc(100vh-150px)]">
        <div className="flex flex-col space-y-2 bg-green">
          {itemsTop.map((item) => (
            item.name === "Courses" ? (
              <div key={item.path}>
                <button
                  onClick={toggleCourses}
                  className="flex items-center justify-between w-full p-2 hover:bg-gray-100 rounded-lg"
                >
                  <div className="flex items-center">
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </div>
                  {isCoursesOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                {isCoursesOpen && item.items && (
                  <div className="ml-6 mt-2 space-y-2">
                    {item.items.map((subItem) => (
                      <SidebarItem
                        key={subItem.path}
                        item={{
                          name: subItem.name,
                          path: subItem.path,
                          icon: Book,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <SidebarItem key={item.path} item={item} />
            )
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