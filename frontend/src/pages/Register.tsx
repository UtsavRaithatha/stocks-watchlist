import React from "react";

import Form from "../components/Form";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <>
      <Form route="/api/user/register/" method="register" />
      <p style={{ textAlign: "center" }}>
        Already have an account?{" "}
        <Link to="/login" style={{ textDecoration: "none", color: "blue" }}>
          Login
        </Link>
      </p>
    </>
  );
};

export default Register;
