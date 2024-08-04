import React from 'react';
import Head from 'next/head';
import { User, Settings, FileText } from 'lucide-react';

const AdminPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Admin Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
      </header>

      <div className="flex">

        <main className="flex-1 p-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Welcome to the Admin Dashboard</h2>
            
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;