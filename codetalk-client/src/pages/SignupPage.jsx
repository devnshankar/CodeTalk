import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Make axios call to signup endpoint
      const response = await axios.post('http://localhost:5085/user/createuser', { name, email, password });
      console.log(response.data); // Assuming response contains user data or success message
      navigate("/login"); // Redirect to login page after successful signup
    } catch (error) {
      console.error('Signup failed:', error.response.data);
      // Handle signup error, e.g., display error message to the user
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form
        onSubmit={handleFormSubmit} // Call handleFormSubmit on form submission
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          padding: "20px",
          alignItems: "center",
          marginTop: "30%",
        }}
      >
        <h1>Signup</h1>
        <input
          style={{ marginBottom: "15px" }}
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="name"
          placeholder="johndoe"
        />
        <input
          style={{ marginBottom: "15px" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="johndoe@gmail.com"
        />
        <input
          style={{ marginBottom: "15px" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
        />
        <button type="submit">Signup</button> {/* Changed button type to "submit" */}
        <Link to="/login">
          <h6>Already have an account yet? Login here</h6>
        </Link>
      </form>
    </div>
  );
}

export default SignupPage;
