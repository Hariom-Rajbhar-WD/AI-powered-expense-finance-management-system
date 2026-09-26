 import { useState } from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import API from "../services/api";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const submitHandler = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/auth/register",
        form
      );

      alert(
        "Registration successful. Please login."
      );

      navigate("/login");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );

    }
  };

  return (
    <div className="auth-page">

      <form
        className="auth-card"
        onSubmit={submitHandler}
      >

        <h1>Create Account</h1>

        <p>Start managing your finances</p>

        <input
          name="name"
          placeholder="Full name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Register
        </button>

        <p>
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Register;