import { createContext, ReactNode, useState } from "react";

// Define the types for your data
interface studentType {
  id: string | null;
  type: string | null;
  // isLoggedIn: boolean;
}

interface AuthContextType {
  studentInfoStored: studentType;
  setStudentInfoStored: (studentInfoStored: studentType) => void;
}

export const AuthInfo = createContext<AuthContextType>({
  studentInfoStored: {
    id: "",
    type: null,
  },
  setStudentInfoStored: ({ id, type }) => {},
});

