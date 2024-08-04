'use client'
import { useParams } from 'next/navigation';
import React from 'react';
import { User, Mail, Phone, Calendar, Key, Activity } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Props = {}

const ProfilePage = (props: Props) => {
  const params = useParams();

  return (
    <div className="container mx-auto p-6">
      {/* <h1 className="text-3xl font-bold mb-6">Admin Profile</h1> */}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Personal Information */}
        <Card className="col-span-2 p-6">
          <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
          <div className="flex items-center mb-4">
            <Avatar className="h-24 w-24 mr-4">
              <AvatarImage src="/admin-avatar.jpg" alt="Admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-medium">John Doe</h3>
              <p className="text-gray-500">Administrator</p>
            </div>
          </div>
          <div className="space-y-2">
          <p><strong>Admin ID:</strong> 11338323</p>
            <p><strong>Email:</strong> john.doe@example.com</p>
            <p><strong>Phone:</strong> +1 (555) 123-4567</p>
            <p><strong>Date of Birth:</strong> 12/09/1998</p>
            <p><strong>Role:</strong> Admin</p>
          </div>
          <Button className="mt-4">Edit Profile</Button>
        </Card>

        {/* Account Settings */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>
          <ul className="space-y-2">
            <li><Button variant="link">Change Password</Button></li>
            <li><Button variant="link">Two-Factor Authentication</Button></li>
            <li><Button variant="link">Notification Preferences</Button></li>
          </ul>
        </Card>

        {/* Recent Activity */}
        <Card className="col-span-2 p-6">
  <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
  <ul className="space-y-2">
    <li>Updated student grades for Math 101 - 2 hours ago</li>
    <li>Created new course syllabus for History 202 - 1 day ago</li>
    <li>Reviewed and approved 10 student applications - 3 days ago</li>
    <li>Scheduled parent-teacher conferences - 5 days ago</li>
    <li>Organized school event for Science Fair - 1 week ago</li>
  </ul>
</Card>

        {/* Quick Stats */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Quick Stats</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Total Students</p>
              <p className="text-2xl font-bold">1,234</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Courses</p>
              <p className="text-2xl font-bold">567</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Staff</p>
              <p className="text-2xl font-bold">89</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default ProfilePage



