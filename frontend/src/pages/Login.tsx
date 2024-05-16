import React from "react";
import Form from "../components/Form";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <Form route="/api/token/" method="login" />
      <p style={{ textAlign: "center" }}>
        Don't have an account?{" "}
        <Link to="/register" style={{ textDecoration: "none", color: "blue" }}>
          Register
        </Link>
      </p>
    </>
  );
};

export default Login;
