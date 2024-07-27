"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Book, User, Mail, Phone, Calendar, Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  selectedCourses: z.array(z.number()).min(1, "Select at least one course."),
});

type FormData = z.infer<typeof schema>;

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
  const [courses1, setCourses1] = useState<CourseType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [selectedCourses, setSelectedCourses] = useState<number[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { selectedCourses: [] },
  });

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target;
    const courseId = Number(value);

    setSelectedCourses((prevSelectedCourses) => {
      if (checked) {
        return [...prevSelectedCourses, courseId]; // Add course if checked
      } else {
        return prevSelectedCourses.filter((id) => id !== courseId); // Remove course if unchecked
      }
    });
  };

  const onSubmit = async (data: FormData) => {
    console.log("Submit functioning");
    console.log(data);

    const enrollmentData = {
      student_id: Number(params.id),
      courses: data.selectedCourses,
    };

    try {
      const response = await axios.post(
        "http://localhost:8002/course_service/enroll_into_course",
        enrollmentData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status === "success") {
        setMessage("Successfully registered for the course(s)!");
        setMessageType("success");
        // Reset selected courses after successful submission
        setSelectedCourses([]);
      } else {
        console.error("Error registering for course:", response.data.message);
      }
    } catch (e) {
      console.error("Error:", e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "http://localhost:8002/course_service/enrollment_courses"
        );
        if (response.data) {
          setCourses1(response.data);
        } else {
          setCourses1([]);
        }
      } catch (error) {
        console.error(error);
        setError("Failed to fetch courses. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [params.id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:8002/course_service/student_grades?s_id=${params.id}`
        );
        if (response.data.grades) {
          setCourses(response.data.grades);
        } else {
          setCourses([]);
        }
      } catch (error) {
        console.error(error);
        setError("Failed to fetch courses. Please try again later.");
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
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
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
        <p className="text-gray-600">
          You are not registered for any courses yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.course_id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {course.course_name}
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  {course.course_code}
                </p>
                <div className="space-y-2">
                  <p className="flex items-center text-gray-700">
                    <Book className="mr-2" size={16} /> {course.credit_hour}{" "}
                    Credit Hours
                  </p>
                  <p className="flex items-center text-gray-700">
                    <Calendar className="mr-2" size={16} />{" "}
                    {course.academic_year}
                  </p>
                  <p className="flex items-center text-gray-700">
                    <Clock className="mr-2" size={16} /> {course.semester}
                  </p>
                </div>
                <p className="mt-4 text-gray-600">{course.description}</p>
              </div>
              <div className="bg-gray-50 px-6 py-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Lecturer Information
                </h3>
                <p className="flex items-center text-gray-700">
                  <User className="mr-2" size={16} /> {course.lecturer_fname}{" "}
                  {course.lecturer_oname}
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

      {/* Register for a new course */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Register for a New Course
        </h2>
        {courses1.length === 0 ? (
          <p className="text-gray-600">
            No courses available for registration.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
              <table className="min-w-full bg-white rounded-md">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 rounded-tl-md  uppercase tracking-wider justify-center"></th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course Code
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Credit Hours
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Academic Year
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Semester
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 rounded-tr-md uppercase tracking-wider">
                      Lecturer
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                  {courses1.map((course) => (
                    <tr key={course.course_id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <input
                          type="checkbox"
                          {...register("selectedCourses")}
                          id={course.course_id}
                          value={course.course_id}
                          onChange={handleCheckboxChange}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {course.course_code}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {course.course_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {course.credit_hour}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {course.academic_year}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {course.semester}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {`${course.lecturer_lname} ${course.lecturer_oname[0]}. ${course.lecturer_fname}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Register Course(s)
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursePage;
