// // import { api } from '@utils/api.ts';

import axios from "axios";
import { GetStaticProps } from "next";

// import api from "./api";



// // Define the types for your data
// interface Student {
//   student_id: number;
//   fname: string;
//   lname: string;
//   oname?: string;
//   email: string;
//   phone: string;
//   password: string;
//   dob: string; // or Date if you handle conversion
//   profile_img?: string;
//   level: number;
// }

// interface Enrollment {
//   course_id: number;
//   student_id: number;
//   enrollment_id: number;
//   score?: number;
//   grade?: string;
//   date_enrolled?: string; // or Date if you handle conversion
// }

// interface PaymentRecord {
//   payment_id: number;
//   student_id: number;
//   amount: number;
//   payment_year: number;
//   reference: 'academic' | 'residential' | 'other';
//   payment_date?: string; // or Date if you handle conversion
// }

// interface Grade {
//   course_id: number;
//   score: number | null;
//   grade: string | null;
//   course_code: string;
//   course_name: string;
//   credit_hour: number;
//   academic_year: number;
//   semester: number;
//   description: string;
//   img: string | null;
//   lecturer_fname: string;
//   lecturer_lname: string;
//   lecturer_oname: string;
//   lecturer_email: string;
//   lecturer_phone: string;
//   lecturer_profile_img: string | null;
// }

// // API function to get student grades
// export const getStudentGrades = async (s_id: string) => {
//   try {
//     const response = await api.get(`/student/retrieveStudentGrades`, {
//       params: { s_id }
//     });
//     console.log(response);
//     return response.data;
//   } catch (error) {
//     console.error('Error retrieving student grades:', error);
//     throw error;
//   }
// };

// // API function to enroll a student
// export const enrollStudent = async (studentData: Student) => {
//   try {
//     const response = await api.post(`/student/enrollStudent`, studentData);
//     return response.data;
//   } catch (error) {
//     console.error('Error enrolling student:', error);
//     throw error;
//   }
// };

// // API function to calculate outstanding fees
// export const calculateOutstandingFees = async (studentID: string, academicYear: string) => {
//   try {
//     const response = await api.get(`/student/calculateOutstandingFees`, {
//       params: { studentID, academicYear }
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error calculating outstanding fees:', error);
//     throw error;
//   }
// };

// // Add more functions as needed for other API endpoints
// // const grade: Grade = getStudentGrades('11111111').grades;




    
