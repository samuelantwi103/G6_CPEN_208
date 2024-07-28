'use client'
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

interface StudentType {
  payment_id: string;
  amount: string;
  payment_year: string;
  account_number: string;
  reference: string;
  payment_date?: string;
}

type Props = {
  params: {
    id: string,
    email: string,
  };
};

const FinancePage = ({ params }: Props) => {
  const [studentInfo, setStudentInfo] = useState<StudentType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:8002/course_service/payment_history?s_id=${params.id}`);
        setStudentInfo(response.data.payments || []);
        // console.log(response.data.payments);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const totalAmount = studentInfo.reduce((sum, payment) => sum + parseFloat(payment.amount), 0);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (studentInfo.length === 0) {
    return (
      <div className="container mx-auto p-6 py-3">
        <h1 className="text-3xl font-bold mb-6">Financial Summary</h1>
        <div className="bg-yellow-100 p-4 rounded-lg">
          <p className="text-xl">No payment made</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Financial Summary</h1>
      
      <div className="bg-blue-100 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-2">Total Payments</h2>
        <p className="text-2xl font-bold">GH₵ {totalAmount.toFixed(2)}</p>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Payment ID</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Year</th>
              <th className="px-4 py-2 text-left">Account Number</th>
              <th className="px-4 py-2 text-left">Reference</th>
              {studentInfo[0]?.payment_date && <th className="px-4 py-2 text-left">Date</th>}
            </tr>
          </thead>
          <tbody>
            {studentInfo.map((payment) => (
              <tr key={payment.payment_id} className="border-t">
                <td className="px-4 py-2">{payment.payment_id}</td>
                <td className="px-4 py-2">GH₵ {parseFloat(payment.amount).toFixed(2)}</td>
                <td className="px-4 py-2">{payment.payment_year}</td>
                <td className="px-4 py-2">{payment.account_number}</td>
                <td className="px-4 py-2 capitalize">{payment.reference}</td>
                {payment.payment_date && <td className="px-4 py-2">{new Date(payment.payment_date).toLocaleDateString()}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinancePage;