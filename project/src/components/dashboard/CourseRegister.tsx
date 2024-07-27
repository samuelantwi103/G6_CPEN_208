"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";


const schema = z.object({
  course_code: z.string().min(1, "Course code is required"),
  course_name: z.string().min(1, "Course name is required"),
  credit_hour: z.string().min(1, "Course hour is required"),
  description: z.string().min(1, "Course description is required"),
  semester: z.string().min(1, "Course hour is required"),
  academic_year : z.string().min(1, "Course hour is required"),
  
});

type Props = {
  params: {
    id: string,
  };
};

type FormData = z.infer<typeof schema>;

const RegisterCourse = ({params}:Props) => {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    // try {
    //   const response = await axios.post(
    //     `http://localhost:8002/course_service/add_course?s_id=${params.id}`,
    //     data,
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );
    //   // console.log(response);
    //   if (response.data.status === 'success') {
    //     // router.push("/dashboard");
    //     setMessage("Successfully registered for the course!");
    //    setMessageType("success");
    //   } else {
    //     console.error("Error registering for course");
    //   }
    // } catch (e) {
    //   console.error("Error:", e);
    // }
    console.log(data)
  };

  return (
    <div className="flex min-h-64">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2 text-center">Register for a Course</h2>
        <p className="text-center text-gray-600 mb-6">Fill in the details to register for a course</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="relative">
            {/* <Book className="absolute left-3 top-3 text-gray-400" size={20} /> */}
            <input
              {...register("course_code")}
              type="text"
              placeholder="Course code"
              className="w-full pl-10 pr-3 py-2 border rounded-md"
            />
          </div>
          {errors.course_code && <p className="text-red-500 text-sm">{errors.course_code.message}</p>}
          
          <div className="relative">
            {/* <Book className="absolute left-3 top-3 text-gray-400" size={20} /> */}
            <input
              {...register("course_name")}
              type="text"
              placeholder="Course name"
              className="w-full pl-10 pr-3 py-2 border rounded-md"
            />
          </div>
          {errors.course_name && <p className="text-red-500 text-sm">{errors.course_name.message}</p>}
          
          <div className="relative">
            {/* <Book className="absolute left-3 top-3 text-gray-400" size={20} /> */}
            <input
              {...register("credit_hour")}
              type="number"
              placeholder="Credit hour"
              className="w-full pl-10 pr-3 py-2 border rounded-md"
            />
          </div>
          {errors.credit_hour && <p className="text-red-500 text-sm">{errors.credit_hour.message}</p>}

          <div className="relative">
            {/* <Book className="absolute left-3 top-3 text-gray-400" size={20} /> */}
            <input
              {...register("semester")}
              type="text"
              placeholder="Semester"
              className="w-full pl-10 pr-3 py-2 border rounded-md"
            />
          </div>
          {errors.semester && <p className="text-red-500 text-sm">{errors.semester.message}</p>}
          
          <div className="relative">
            {/* <Book className="absolute left-3 top-3 text-gray-400" size={20} /> */}
            <input
              {...register("academic_year")}
              type="text"
              placeholder="Academic year"
              className="w-full pl-10 pr-3 py-2 border rounded-md"
            />
          </div>
          {errors.academic_year && <p className="text-red-500 text-sm">{errors.academic_year.message}</p>}
          
          <div className="relative">
  {/* <Book className="absolute left-3 top-3 text-gray-400" size={20} /> */}
  <textarea
    {...register("description")}
    placeholder="Course description"
    className="w-full pl-10 pr-3 py-2 border rounded-md h-32 resize-none"
  />
</div>
{errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Register for Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterCourse;