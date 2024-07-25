'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Book, User, Mail, Phone, Calendar, Clock } from 'lucide-react';
import RegisterCourse from '@/components/dashboard/CourseRegister';

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
  lecturer_email: string;
  lecturer_phone: string;
}

type Props = {
  params: {
    id: string;
    email: string;
  };
};

const CoursePage = ({ params }: Props) => {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:8002/course_service/student_grades?s_id=${params.id}`);
        if (response.data.grades) {
          setCourses(response.data.grades);
        } else {
          setCourses([]);
        }
      } catch (error) {
        console.error(error);
        setError('Failed to fetch courses. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Courses</h1>
      {courses.length === 0 ? (
        <p className="text-gray-600">You are not registered for any courses yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.course_id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{course.course_name}</h2>
                <p className="text-sm text-gray-600 mb-4">{course.course_code}</p>
                <div className="space-y-2">
                  <p className="flex items-center text-gray-700">
                    <Book className="mr-2" size={16} /> {course.credit_hour} Credit Hours
                  </p>
                  <p className="flex items-center text-gray-700">
                    <Calendar className="mr-2" size={16} /> {course.academic_year}
                  </p>
                  <p className="flex items-center text-gray-700">
                    <Clock className="mr-2" size={16} /> {course.semester}
                  </p>
                </div>
                <p className="mt-4 text-gray-600">{course.description}</p>
              </div>
              <div className="bg-gray-50 px-6 py-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Lecturer Information</h3>
                <p className="flex items-center text-gray-700">
                  <User className="mr-2" size={16} /> {course.lecturer_fname} {course.lecturer_oname}
                </p>
                <p className="flex items-center text-gray-700">
                  <Mail className="mr-2" size={16} /> {course.lecturer_email}
                </p>
                <p className="flex items-center text-gray-700">
                  <Phone className="mr-2" size={16} /> {course.lecturer_phone}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Register for a New Course</h2>
        <RegisterCourse params={params}/>
      </div>
    </div>
  );
};

export default CoursePage;