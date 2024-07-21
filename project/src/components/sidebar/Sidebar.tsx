"use client";
import Image from "next/image";
import React from "react";

import {
  LayoutDashboard,
  CircleUser,
  Wallet,
  Book,
  LucideIcon,
  LogOutIcon,
  CalendarCheck,
  School,
} from "lucide-react";

import SidebarItem from "@/components/sidebar/item";
import Sidebaritem from "@/components/sidebar/item";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";


const Sidebar = () => {
  const params = useParams();

  interface Sidebaritem {
    name: string;
    icon: LucideIcon;
    path: string;
    items?: SubItem[];
  }
  
  interface SubItem {
    name: string;
    path: string;
  }
  
  const itemsTop: Sidebaritem[] = [
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
  const itemsBottom: Sidebaritem[] = [
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
 console.log(params)
  return (
    <div className=" flex sticky top-16 z-[400]">
      <div>
        {/* <Image className={styles.userImage} src="/noavatar.png" alt="" width={50} height={50}/> */}
        {/* <div className={styles.userDetail}>
          <span className={styles.username}>Yhoung</span>
          <span className={styles.userTitle}>John@gmail.com</span>
          </div> */}
      </div>
      <div className="flex flex-col space-y-10 justify-between w-full h-[calc(100vh-150px)]">
        <div className="flex flex-col space-y-2 bg-green ">
          {itemsTop.map((item) => (
            <SidebarItem key={item.path} item={item} />
          ))}
        </div>
        <div className="flex flex-col space-y-2 bg-green ">
          {itemsBottom.map((item) => (
            <SidebarItem key={item.path} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
