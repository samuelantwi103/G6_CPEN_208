"use client";
import React, { useState }  from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { FolderPen, Lock, Eye, EyeOff } from 'lucide-react';

const schema = z.object({
  student_id: z.string().min(8,  "Invalid Student ID").max(8, "Invalid Student ID"),
  password: z.string().min(1, "Password is required"),
});

type FormData = z.infer<typeof schema>;

const SignInForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    console.log(data);
    // try {
    //   const response = await axios.post(
    //     "http://localhost:20201/api/login",
    //     data,
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );

    //   if (response.status === 200) {
    //     router.push("/dashboard");
    //   } else {
    //     console.error("Login failed");
    //   }
    // } catch (e) {
    //   console.error("Error:", e);
    // }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-200">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-xl font-semibold text-center text-blue-500 mb-2">University of Ghana</h1>
        <h2 className="text-2xl font-bold mb-2 text-center">Log In</h2>
        <p className="text-center text-gray-600 mb-6">Login into page</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="relative">
            <FolderPen className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              {...register("student_id")}
              type="text"
              placeholder="Student ID"
              className="w-full pl-10 pr-3 py-2 border rounded-md"
            />
          </div>
          {errors.student_id && <p className="text-red-500 text-sm">{errors.student_id.message}</p>}
          
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="********"
              className="w-full pl-10 pr-10 py-2 border rounded-md text-black"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-400"
            >
              {!showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          {/* <div className="text-right">
            <a href="#" className="text-pink-500 text-sm">Forgot Password?</a>
          </div> */}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-pink-600 transition duration-300"
          >
            Log In
          </button>
        </form>
        <p className="text-xs text-center text-gray-500">
          Don&apos;t have an account? <a href="/signup" className="text-blue-500 font-semibold">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;