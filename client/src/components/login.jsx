import React, { useState } from "react";
import axios from "axios";

export default function AuthForm({setShowLogin, setLoginUser, setUserid}) {
  const [isLoginView, setIsLoginView] = useState(true);
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (data) => {
    try {
      console.log("Sending request", data);
      const response = await axios.post("http://localhost:3001/login", data);
      console.log("Received response", response);

      if (response.status === 200) {
        console.log("Login Successful:", response.data);
        setShowLogin(false);
        setUserid(response.data.user);
        setLoginUser( response.data.name);
        setUserData({ firstname: "", lastname: "", email: "", password: "" });
        setError(""); 
      } else {
        console.log(response.data);
        setError(response.data.message || "An unknown error occurred");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setError("User does not exist.");
        } else if (error.response.status === 401) {
          setError("Password incorrect.");
        } else {
          setError(
            error.response.data.message || "An error occurred during login."
          );
        }
      } else if (error.request) {
        setError("No response from server. Check your connection.");
      } else {
        setError("Login failed: " + error.message);
      }
    }
  };

  const handleRegister = async (data) => {
    try {
      console.log(data);
      const response = await axios.post("http://localhost:3001/register", data);
      console.log("Received response");
      if (response.status == 200) {
        // Success response (status codes less than 400 are typically successful)
        console.log(response.data);
        // onClose(); Uncomment this if you want to close a modal or perform some action on success
        setUserData({ firstname: "", lastname: "", email: "", password: "" });
        setError(""); // Clear any previous errors
        setIsLoginView(true);
      } else if (response.status === 204) {
        // Specific handling for status code 404
        setUserData({ firstname: "", lastname: "", email: "", password: "" });
        setError("User already exists, sign in");
        setIsLoginView(true);
      } else {
        // General error handling for other error status codes
        setError(response.data.message || "An unknown error occurred");
      }
    } catch (error) {
      setError(error.response ? error.response.data.message : "Network error");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = isLoginView
      ? { email: userData.email, password: userData.password }
      : { ...userData };

    if (isLoginView) {
      handleLogin(dataToSend);
    } else {
      handleRegister(dataToSend);
    }
  };

  const toggleView = () => {
    setIsLoginView(!isLoginView);
    setUserData({ firstname: "", lastname: "", email: "", password: "" });
    setError(""); // Clear error on view change
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h3 style={{ textAlign: "center" }}>
        {isLoginView ? "Sign In" : "Register"}
      </h3>
      {error && (
        <div style={{ color: "red", textAlign: "center" }}>
          {console.log("Rendering error:", error)}
          {error}
        </div>
      )}

      {!isLoginView && (
        <div className="mb-3">
          <label>First Name</label>
          <input
            type="text"
            name="firstname"
            className="form-control"
            placeholder="Enter First Name"
            value={userData.firstname}
            onChange={handleChange}
          />
        </div>
      )}
      {!isLoginView && (
        <div className="mb-3">
          <label>Last Name</label>
          <input
            type="text"
            name="lastname"
            className="form-control"
            placeholder="Enter Last Name"
            value={userData.lastname}
            onChange={handleChange}
          />
        </div>
      )}
      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Enter email"
          value={userData.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Enter password"
          value={userData.password}
          onChange={handleChange}
        />
      </div>
      <div className="d-grid mb-2">
        <button type="submit" className="btn btn-primary">
          {isLoginView ? "Sign In" : "Register"}
        </button>
      </div>
      <div className="text-center">
        <button type="button" className="btn btn-link" onClick={toggleView}>
          {isLoginView
            ? "Need an account? Register"
            : "Have an account? Sign In"}
        </button>
      </div>
    </form>
  );
}

const formStyle = {
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
  backgroundColor: "rgba(255, 255, 255, 0.85)",
  width: "300px",
  position: "relative",
  margin: "auto",
};
