import React, { useEffect,useState } from 'react'
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      console.log("done");
      navigate("/home");
    }
  }, []);

  const [validationMessage, setValidationMessage] = useState("");
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your signup logic here, e.g., send data to backend API
    if (formData.confirmPassword.length <= 5) {
      setValidationMessage("Password must be at least 5 characters");
      return;
    } else if (formData.confirmPassword !== formData.password) {
      setValidationMessage("Password and CurrentPassword doesn't matched");
      return;
    }

    console.warn(formData.name, formData.email, formData.password);
    let result = await fetch("http://localhost:3031/api/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: formData.name,
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

    // Reset form fields
    setValidationMessage("");
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="signup-container">
      <h2>Create an Account</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
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
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {validationMessage && (
        <p className="validation-message">{validationMessage}</p>
      )}
    </div>
  );
}

export default Signup;
