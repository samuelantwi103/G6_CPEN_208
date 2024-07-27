// pages/index.js
import React from 'react';
import { LayoutGrid, User, DollarSign, BookOpen, FileText, Calendar, LogOut, Book, ChevronRight } from 'lucide-react';
import Sidebar from '@/components/sidebar/Sidebar';
import GetDate from '@/components/dashboard/Getdate';
import { getTime } from '@/components/dashboard/getTime';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Image from 'next/image';
// import { getstaffGrades } from '@/utils/[...nextauth]/staff_api';

type Props = {
  params: {
    id: string;
  };
};

const Dashboard = ({params}:Props) => {
  const timeOfDay = getTime();


  return (
    <div >
      {/* Sidebar */}
      

      {/* Main Content */}
      <main className="flex-3 p-0 ">
      <div className="p-0 border-b border-gray-200">
      {/* // calling the getTime function from getTime.ts */}
  


    <div className="p-0 bg-gray-100">
    {/* // calling GetDate function from GetDate.tsx */}
    <GetDate params={params}/>
    {/* // div class to display a message based on the time of the day */}
    <div className="mb-6">
    <h2 className="text-2xl font-bold">Good {timeOfDay} {params.id} 😂!</h2>
        {timeOfDay === 'morning' && <p>Time to have a great start to your day!</p>}
        {timeOfDay === 'afternoon' && <p>Hope your day is going well!</p>}
        {timeOfDay === 'evening' && <p>Have a relaxing evening!</p>}
    </div>
      
    {/* // This is used to display your courses */}
    <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Your courses</h3>
              <Link href={`/staff/${params.id}/courses`} className="text-sm text-blue-600">View All</Link>
            </div>
            <Card className="bg-white shadow-sm mb-4">
              <CardContent className="p-4 flex items-center">
              <Link href={`/staff/${params.id}/courses`}><Image src="/books.jpg" alt="Placeholder" width={48} height={48} className="w-12 h-12 bg-gray-200 rounded-lg mr-4"/> </Link>
                <div>
                  <p className="font-semibold">Course One</p>
                  <p className="text-xs text-gray-500">12 lessons • 6h 30min • Beginner</p>
                  <p className="text-xs text-gray-500">Michael Brown</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm">
              <CardContent className="p-4 flex items-center">
              <Link href={`/staff/${params.id}/courses`}><Image src="/books.jpg" alt="Placeholder" width={48} height={48}  className="w-12 h-12 bg-gray-200 rounded-lg mr-4"/> </Link>
                <div>
                  <p className="font-semibold">Course Two</p>
                  <p className="text-xs text-gray-500">8 lessons • 4h 15min • Beginner</p>
                  <p className="text-xs text-gray-500">Mary Smith</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* // This is used to display the course tasks */}
          <Card className="bg-white shadow-sm mb-6">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-semibold">Course Task</CardTitle>
                <Link href={`/staff/${params.id}/finance`}  className="text-sm text-blue-600">View All</Link>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {['Assignment 2', 'LAB report', 'Interim Assessment'].map((task, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                        {index === 0 && <Book size={16} className="text-indigo-600" />}
                        {index === 1 && <Book size={16} className="text-indigo-600" />}
                        {index === 2 && <Book size={16} className="text-indigo-600" />}
                      </div>
                      <span className="text-sm">{task}</span>
                    </div>
                
                      <Link href="/assignments">
                        <ChevronRight size={16} className="text-gray-400 transform" />  
                      </Link>

                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

      </div>
      <div className="p-4">
        {/* Additional dashboard content can be added here */}
      </div>
        
        {/* Additional dashboard content can be added here */}
      </main>
    </div>
  );
};

export default Dashboard;