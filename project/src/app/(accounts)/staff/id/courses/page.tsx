"use client"
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import router from 'next/router';
import { useRouter } from 'next/navigation';


const LecturerCoursePage = () => {
  const router = useRouter();
  const [courses, setCourses] = useState([
    {
      id: 1,
      code: "CS101",
      title: "Introduction to Computer Science",
      students: 45,
      nextLecture: "2024-08-05T10:00:00",
      assignments: 2,
    },
    {
      id: 2,
      code: "CS202",
      title: "Data Structures and Algorithms",
      students: 38,
      nextLecture: "2024-08-06T14:00:00",
      assignments: 1,
    },
    {
      id: 3,
      code: "CS301",
      title: "Database Systems",
      students: 30,
      nextLecture: "2024-08-07T11:00:00",
      assignments: 3,
    },
  ]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Courses</h1>
      
      {courses.map((course) => (
        <Card key={course.id} className="mb-6 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">{course.code}: {course.title}</h2>
            <span className="text-gray-500">{course.students} students</span>
          </div>
          
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="materials">Materials</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <p className="mb-2">Next lecture: {new Date(course.nextLecture).toLocaleString()}</p>
              <p>Pending assignments: {course.assignments}</p>
              <div className="mt-4">
              <Button className="mr-2" onClick={() => router.push(`/staff/id/edit`)}>Edit Course</Button>
                <Button variant="outline">Send Announcement</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="students">
              <p>Student list and management options would go here.</p>
              <Button className="mt-2">View Full List</Button>
            </TabsContent>
            
            <TabsContent value="assignments">
              <p>Assignment creation and grading interface would go here.</p>
              <Button className="mt-2">Create New Assignment</Button>
            </TabsContent>
            
            <TabsContent value="materials">
              <p>Course materials and upload options would go here.</p>
              <Button className="mt-2">Upload Material</Button>
            </TabsContent>
          </Tabs>
        </Card>
      ))}
      
      <Button className="mt-4">Add New Course</Button>
    </div>
  );
};

export default LecturerCoursePage;