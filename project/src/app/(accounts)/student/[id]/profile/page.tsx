'use client'
import React , {useEffect, useState} from 'react';
import axios from 'axios';
import { User, Mail, Briefcase, MapPin, Calendar, ChevronRight, ChevronLeft, Camera, X,FileText, Book } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';
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

const ProfilePage = ({params}:Props) => {
  const [studentInfo, setStudentInfo] = useState<studentType | null>(null);
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8002/course_service/student_info?s_id=${params.id}`);
        setStudentInfo(response.data); // Update state with fetched data
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, [params.id]);
  return (
    
   
        // <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 bg-white shadow-md mb-6 rounded-xl overflow-hidden ">
        <div className="bg-white shadow-md mb-6 rounded-xl overflow-hidden">
        <div className="md:flex ">
          <div className="md:shrink-0">
            <Image width={58} height={48} className="h-48 w-full  bg-gray-200 rounded-lg mr-4" src='/noavatar.jpg' alt=""/>
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{studentInfo?.fname} {studentInfo?.lname} {studentInfo?.oname}</div>
            {/* <p className="mt-2 text-gray-500">A student of university of ghana</p> */}
            <div className="mt-4">
              <div className="flex items-center mt-2">
                {/* <Mail className="h-5 w-5 text-gray-400" /> */}
                <span className="ml-2 text-gray-500">{studentInfo?.student_id}</span>
              </div>
              <div className="flex items-center mt-2">
                {/* <Briefcase className="h-5 w-5 text-gray-400" /> */}
                <span className="ml-2 text-gray-500">{studentInfo?.email}</span>
              </div>
              <div className="flex items-center mt-2">
                {/* <MapPin className="h-5 w-5 text-gray-400" /> */}
                <span className="ml-2 text-gray-500">{studentInfo?.dob}</span>
              </div>
              <div className="flex items-center mt-2">
                {/* <Calendar className="h-5 w-5 text-gray-400" /> */}
                <span className="ml-2 text-gray-500"> {studentInfo?.phone}</span>
              </div>
              <div className="flex items-center mt-2">
                {/* <Calendar className="h-5 w-5 text-gray-400" /> */}
                <span className="ml-2 text-gray-500">Level {studentInfo?.level}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    // </div>
    
  )
}

export default ProfilePage





