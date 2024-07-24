'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8002/course_service/student_grades?s_id=${params.id}`);
        setCourses(response.data.grades);
        console.log(response.data.grades);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [params.id]);

  if (courses.length === 0) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="space-y-6 p-4">
      {courses.map((course) => (
        <div key={course.course_id} className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">{course.course_name}</h2>
          <div className="grid grid-cols-2 gap-4">
            <p><strong>Course ID:</strong> {course.course_id}</p>
            <p><strong>Course Code:</strong> {course.course_code}</p>
            <p><strong>Credit Hours:</strong> {course.credit_hour}</p>
            <p><strong>Academic Year:</strong> {course.academic_year}</p>
            <p><strong>Semester:</strong> {course.semester}</p>
            <p className="col-span-2"><strong>Description:</strong> {course.description}</p>
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Lecturer Information</h3>
            <p><strong>Name:</strong> {course.lecturer_fname} {course.lecturer_oname}</p>
            <p><strong>Email:</strong> {course.lecturer_email}</p>
            <p><strong>Phone:</strong> {course.lecturer_phone}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoursePage;