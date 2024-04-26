import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import useUserStore from "../../zustand/store.jsx";
function VerifyOtpPage() {
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(120); // Initial countdown value in seconds
  const navigate = useNavigate();
  const { user, setUser } = useUserStore();
  
  // Function to handle OTP form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    
    try {
      // Make axios call to verify OTP endpoint
      const response = await axios.post('http://localhost:5085/user/loginuser', { email: user.email, otp });

      // Assuming OTP verification was successful
      console.log(response.data); // Log the response data
      navigate('/dashboard'); // Redirect to the dashboard
    } catch (error) {
      console.error('OTP verification failed:', error.response.data);
      // Handle OTP verification error, e.g., display error message to the user
    }
  };

  // Function to update the countdown timer
  useEffect(() => {
    const timer = setTimeout(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1); // Decrease countdown value by 1 second
      }
    }, 1000); // Update countdown every second

    // Clear the timer when countdown reaches 0
    return () => clearTimeout(timer);
  }, [countdown]); // Re-run effect when countdown changes

  // Format countdown timer for display
  const formattedCountdown = `${Math.floor(countdown / 60)
    .toString()
    .padStart(2, "0")}:${(countdown % 60).toString().padStart(2, "0")}`;

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
        <h1>Verify OTP</h1>
        <p>Enter the OTP sent to your email</p>
        <input
          style={{ marginBottom: "15px" }}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          type="text"
          placeholder="Enter OTP"
        />
        <button type="submit">Verify OTP</button>
        <p>Resend OTP in {formattedCountdown}</p>
        <Link to="/login">
          <h6>Return to login</h6>
        </Link>
      </form>
    </div>
  );
}

export default VerifyOtpPage;
