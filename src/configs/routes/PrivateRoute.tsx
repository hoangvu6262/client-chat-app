import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

import ServerLayout from "../../layouts/server/ServerLayout";

const PrivateRoute: React.FC = () => {
  const { user, isSignedIn } = useUser();
  const location = useLocation();

  console.log(user, isSignedIn);

  if (!user) {
    return <Navigate to="/sign-in" />;
  }

  if (location.pathname === "/") {
    return <Navigate to="/server" />;
  }

  return <ServerLayout />;
};
export default PrivateRoute;
