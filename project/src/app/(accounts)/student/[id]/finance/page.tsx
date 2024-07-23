'use client'
import React , {useEffect, useState} from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
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
type Props = {
  params: {
    id: string,
    email: string,
  };
};


const FinancePage = ({params}:Props) => {
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
    <div >
      
    </div>
  );
};

export default FinancePage;