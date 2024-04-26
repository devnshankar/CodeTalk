import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function LoginPage() {
  const [email, setEmail] = useState("pdfnotes66@gmail.com");
  const [password, setPassword] = useState("pdfnotes66");
  const [ loginLoading, setLoginLoading] = useState(false)
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      setLoginLoading(loginLoading => true)
      // Make axios call to login url
      const response = await axios.put('http://localhost:5085/user/getotp', { email, password });
      setLoginLoading(loginLoading => false)
      // Assuming login was successful and a token is received in response
      console.log(response.data); // Log the response data
      navigate('/verify'); // Redirect to the dashboard
    } catch (error) {
      console.error('Login failed:', error.response.data);
      // Handle login error, e.g., display error message to the user
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
        <h1>Login</h1>
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
        <button type="submit">{
          (loginLoading)? "Loading !!!" : "Login"
        }</button>
        <Link to="/signup">
          <h6>Dont have an account yet? Register here</h6>
        </Link>
      </form>
    </div>
  );
}

export default LoginPage;
