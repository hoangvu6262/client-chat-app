import React from "react";
import { Outlet } from "react-router-dom";

type Props = {};

const AuthLayout = (props: Props) => {
  return (
    <div className="auth-container">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
