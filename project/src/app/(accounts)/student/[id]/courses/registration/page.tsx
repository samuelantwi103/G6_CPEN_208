"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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

const RegisterPage = ({ params }: Props) => {
  const [availableCourses, setAvailableCourses] = useState<CourseType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [authError, setAuthError] = useState("");
  const { 
    register, 
    handleSubmit, 
    setError: setFormError,
    clearErrors,
    formState: { errors } 
  } = useForm<FormData>({
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


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
       {/* Register for a new course */}
      <Card>
      <CardHeader>
          <CardTitle>Register for New Courses</CardTitle>
        </CardHeader>
        <CardContent>
        {authError && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{authError}</AlertDescription>
          </Alert>
        )}
        {availableCourses.length === 0 ? (
          <p className="text-gray-600">No courses available for registration.</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Table>
            <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]"></TableHead>
                    <TableHead className="text-center">Course Code</TableHead>
                    <TableHead >Course Name</TableHead>
                    <TableHead className="text-center">Credit Hours</TableHead>
                    <TableHead className="text-center">Academic Year</TableHead>
                    <TableHead className="text-center">Semester</TableHead>
                    <TableHead>Lecturer</TableHead>
                  </TableRow>
                </TableHeader>
            
            
                <TableBody>
                  {availableCourses.map((course) => (
                     <TableRow key={course.course_id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <input
                          type="checkbox"
                          {...register("selectedCourses")}
                          value={course.course_id}
                          id={`course-${course.course_id}`}
                        />
                      </td>
                      <TableCell className="text-center">{course.course_code}</TableCell>
                      <TableCell>{course.course_name}</TableCell>
                      <TableCell className="text-center">{course.credit_hour}</TableCell>
                      <TableCell className="text-center">{course.academic_year}</TableCell>
                      <TableCell className="text-center">{course.semester}</TableCell>
                      <TableCell>{`${course.lecturer_lname} ${course.lecturer_oname[0]}. ${course.lecturer_fname}`}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                </Table>
              
            {errors.selectedCourses && (
              <p className="text-red-500 mt-2">{errors.selectedCourses.message}</p>
            )}
            <Button type="submit" className="w-full mt-4">
              Register Course(s)
            </Button>
          </form>
        )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;