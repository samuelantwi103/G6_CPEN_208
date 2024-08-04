"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Book, User, Mail, Phone, Calendar, Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
;

interface CourseType {
  course_id: string;
  course_code: string;
  course_name: string;
  credit_hour: string;
  academic_year: string;
  semester: string;
  description: string;
  lecturer_fname: string;
  lecturer_oname: string;
  lecturer_lname: string;
  lecturer_email: string;
  lecturer_phone: string;
}

type Props = {
  params: {
    id: string;
  };
};

const CoursePage = ({ params }: Props) => {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [availableCourses, setAvailableCourses] = useState<CourseType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    const fetchStudentCourses = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:8002/course_service/student_grades?s_id=${params.id}`
        );
        setCourses(response.data.grades || []);
      } catch (error) {
        console.error("Failed to fetch student courses:", error);
        setError("Failed to fetch student courses. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchStudentCourses();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Courses</h1>
      
      {courses.length === 0 ? (
        <p className="text-gray-600">You are not registered for any courses yet.</p>
      ) : (
        courses.map((course) => (
          <Card key={course.course_id} className="mb-6 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">{course.course_code}: {course.course_name}</h2>
              <span className="text-gray-500">{course.credit_hour} Credit Hours</span>
            </div>
            
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="lecturer">Lecturer</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <p className="mb-2">Academic Year: {course.academic_year}</p>
                <p className="mb-2">Semester: {course.semester}</p>
                <p>{course.description}</p>
              </TabsContent>
              
              <TabsContent value="lecturer">
                <p className="flex items-center text-gray-700 mb-2">
                  <User className="mr-2" size={16} /> {course.lecturer_fname} {course.lecturer_oname} {course.lecturer_lname}
                </p>
                <p className="flex items-center text-gray-700 mb-2">
                  <Mail className="mr-2" size={16} /> {course.lecturer_email}
                </p>
                <p className="flex items-center text-gray-700">
                  <Phone className="mr-2" size={16} /> {course.lecturer_phone}
                </p>
              </TabsContent>
              
              <TabsContent value="details">
                <p className="mb-2">Course Code: {course.course_code}</p>
                <p className="mb-2">Credit Hours: {course.credit_hour}</p>
                <p className="mb-2">Academic Year: {course.academic_year}</p>
                <p>Semester: {course.semester}</p>
              </TabsContent>
            </Tabs>
          </Card>
        ))
      )}
       
    </div>
  );
};

export default CoursePage;