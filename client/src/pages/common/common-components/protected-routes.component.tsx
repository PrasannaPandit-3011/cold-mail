// ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router";
import { Paths } from "../../../enums/paths.enums";

interface ProtectedRoutesProps {
  children: JSX.Element;
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ children }) => {
  const localUser = localStorage.getItem("user");

  if (!localUser) {
    return <Navigate to={Paths.AUTH} />;
  }

  return children;
};

export default ProtectedRoutes;
