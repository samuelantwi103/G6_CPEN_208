"use client";

import { useParams } from "next/navigation";

const CoursePage = () => {
  const params = useParams();
  return (
    <div>
      <main>
        <h1>Course</h1>
        <button
          onClick={() => {
            console.log(params.id);
          }}
        >
          Params
        </button>
      </main>
    </div>
  );
};

export default CoursePage;
