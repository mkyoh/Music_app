import React from "react";
import { useNavigate } from "react-router-dom";
import './Loginn.css';

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Perform login logic here
    
    // After successful login, navigate to the desired page
    navigate("/musiclist"); 
  };

  return (
    <div className="Login">
      <div className="LoginBox">
        <div className="Loginheader"> Login</div>
        <div className="input">
          <input className="user" placeholder="Username" />
          <input className="password" placeholder="password" type="password" />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className="loginbutton" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;