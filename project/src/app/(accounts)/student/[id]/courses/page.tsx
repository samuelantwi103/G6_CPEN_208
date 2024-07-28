"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Book, User, Mail, Phone, Calendar, Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription } from '@/components/ui/alert';

const schema = z.object({
  selectedCourses: z.array(z.string()).min(1, "Select at least one course."),
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
  const [availableCourses, setAvailableCourses] = useState<CourseType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [authError, setAuthError] = useState("");
  const { 
    register, 
    handleSubmit, 
    setError: setFormError,
     clearErrors,
      formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { selectedCourses: [] },
  });

  const onSubmit = async (data: FormData) => {
    // console.log("Submit functioning");
    // console.log(data);
    const enrollmentData = {
      student_id: Number(params.id),
      courses: data.selectedCourses,
    };
    if (data.selectedCourses.length === 0) {
      setFormError("selectedCourses", {
        type: "manual",
        message: "Select at least one course.",
      });

      setTimeout(() => {
        clearErrors("selectedCourses");
      }, 60000); // Clear the error after 1 minute (60000 milliseconds)
    } else {
      
    try {
      const response = await axios.post(
        `http://localhost:8002/course_service/enroll_into_course`,
        enrollmentData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status === "success") {
        setMessage("Successfully registered for the course(s)!");
        console.log("Successfully registered for the course(s)!");
        alert("Successfully registered for the course(s)!")
        window.location.reload();
        // setMessageType("success");
      } else {
        // console.error("Error registering for course:", response.data.message);
        setError(response.data.message || "Registration failed");
        setAuthError("Already registered!")
        // window.location.reload();
      }
    } catch (e) {
      console.error("Error:", e);
      setError("Error registering for course. Please try again later.");
    }
    }

  

  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:8002/course_service/enrollment_courses`);
        setAvailableCourses(response.data || []);
      } catch (error) {
        console.error("Failed to fetch available courses:", error);
        setError("Failed to fetch available courses. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, []);

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

  // if (error) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <div
  //         className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
  //         role="alert"
  //       >
  //         <strong className="font-bold">Error!</strong>
  //         <span className="block sm:inline"> {error}</span>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
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
        {authError && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{authError}</AlertDescription>
          </Alert>
        )}
        {availableCourses.length === 0 ? (
          <p className="text-gray-600">
            No courses available for registration.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
              <table className="min-w-full bg-white rounded-md">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 rounded-tl-md uppercase tracking-wider"></th>
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
                <tbody className="bg-white divide-y divide-gray-200">
                  {availableCourses.map((course) => (
                    <tr key={course.course_id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <input
                          type="checkbox"
                          {...register("selectedCourses")}
                          value={course.course_id}
                          id={`course-${course.course_id}`}
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
              {/* Display validation error */}
            {errors.selectedCourses && (
              <p className="text-red-500 mt-2">{errors.selectedCourses.message}</p>
            )}
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
