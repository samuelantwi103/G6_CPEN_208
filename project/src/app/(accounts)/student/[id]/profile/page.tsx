'use client'
import React, { useEffect, useState, ReactNode } from 'react';
import axios from 'axios';
import { UserCircle2, BookOpen, DollarSign, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  params: {
    id: string,
    email: string,
  };
};

interface studentType {
  fname: string;
  lname: string;
  oname: string;
  student_id: string;
  email: string;
  phone: string;
  dob: string;
  profile_img: string;
  level: string;
}

interface QuickLinkCardProps {
  icon: ReactNode;
  title: string;
  content: string;
}

const QuickLinkCard: React.FC<QuickLinkCardProps> = ({ icon, title, content }) => (
  <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
    <div className="mr-4 text-blue-500">{icon}</div>
    <div>
      <h4 className="font-semibold">{title}</h4>
      <p className="text-sm text-gray-600">{content}</p>
    </div>
  </div>
);

const ProfilePage = ({params}: Props) => {
  const [studentInfo, setStudentInfo] = useState<studentType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8002/course_service/student_info?s_id=${params.id}`);
        setStudentInfo(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, [params.id]);

  return (
    <div className="flex flex-col h-screen bg-gray-100 py-3">
      <div className="flex-grow ">
        <h2 className="text-2xl font-bold mb-6">Welcome, {studentInfo?.fname} {studentInfo?.lname}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Student Info Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <UserCircle2 size={64} className="text-blue-500 mr-4" />
              <div>
                <h2 className="text-xl font-bold text-blue-600">{studentInfo?.fname} {studentInfo?.lname} {studentInfo?.oname}</h2>
                <p className="text-gray-600">Student ID: {studentInfo?.student_id}</p>
              </div>
            </div>
            <div className="space-y-2">
              <p><span className="font-semibold">Email:</span> {studentInfo?.email}</p>
              <p><span className="font-semibold">Date of Birth:</span> {studentInfo?.dob}</p>
              <p><span className="font-semibold">Phone Number:</span> {studentInfo?.phone}</p>
              <p><span className="font-semibold">Level:</span> {studentInfo?.level}</p>
            </div>
          </div>

          {/* Recent Announcements */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">Recent Announcements</h3>
            <ul className="space-y-2">
              <li>📢 Midterm examinations schedule now available</li>
              <li>📚 Library extended hours during exam period</li>
              <li>🏫 Campus maintenance: Building A closed on weekends</li>
            </ul>
          </div>
        </div>
      </div>

      {/* QuickLinkCards at the bottom */}
      <div className="p-6 bg-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href={`/student/${params.id}/courses`}>
          <QuickLinkCard 
            icon={<BookOpen size={24} />} 
            title="Current Courses" 
            content="View your enrolled courses" 
          />
          </Link>
          <Link href={`/student/${params.id}/finance`}>
          <QuickLinkCard 
            icon={<DollarSign size={24} />} 
            title="Financial Summary" 
            content="Check your account balance" 
          />
          </Link>
          <QuickLinkCard  
            icon={<Calendar size={24} />} 
            title="Upcoming Events" 
            content="See your academic calendar" 
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;