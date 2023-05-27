import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [validationMessage, setValidationMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.warn(formData.email, formData.password);
    let result = await fetch("http://localhost:3031/api/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });

    result = await result.json();
    console.warn(result);

    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.email));
      localStorage.setItem("token", JSON.stringify(result.token));
      navigate("/home");
    } else {
      setValidationMessage("Please check your email and password.!");
    }

    console.log(formData);
    // Reset form fields
    setValidationMessage("");
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {validationMessage && (
        <p className="validation-message">{validationMessage}</p>
      )}
    </div>
  );
}

export default Login;
