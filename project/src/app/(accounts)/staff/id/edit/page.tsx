"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const EditCoursePage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [course, setCourse] = useState({
    id: '',
    code: '',
    title: '',
    students: 0,
    nextLecture: '',
    assignments: 0,
  });

  useEffect(() => {
    // Fetch course data when the component mounts
    if (params.id) {
      fetchCourseData(params.id);
    }
  }, [params.id]);

  const fetchCourseData = async (courseId: string) => {
    // In a real application, you would fetch the course data from your API
    // This is a placeholder for demonstration
    const mockCourseData = {
      id: courseId,
      code: 'CS101',
      title: 'Introduction to Computer Science',
      students: 45,
      nextLecture: '2024-08-05T10:00',
      assignments: 2,
    };
    setCourse(mockCourseData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send the updated course data to your API
    console.log('Updated course data:', course);
    // Redirect back to the course list or show a success message
    router.push('/courses');
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Course</h1>
      <form onSubmit={handleSubmit}>
        <Card className="p-6 mb-6">
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div>
              <Label htmlFor="code">Course Code</Label>
              <Input
                id="code"
                name="code"
                value={course.code}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="title">Course Title</Label>
              <Input
                id="title"
                name="title"
                value={course.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="students">Number of Students</Label>
              <Input
                id="students"
                name="students"
                type="number"
                value={course.students}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="nextLecture">Next Lecture</Label>
              <Input
                id="nextLecture"
                name="nextLecture"
                type="datetime-local"
                value={course.nextLecture}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="assignments">Number of Assignments</Label>
              <Input
                id="assignments"
                name="assignments"
                type="number"
                value={course.assignments}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => router.push('/staff/id/courses')}>
            Cancel
          </Button>
          <Button type="submit" className="bg-blue-600 text-white">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditCoursePage;