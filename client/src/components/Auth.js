import React, { useState } from "react";
import { useCookies } from "react-cookie";
const Auth = () => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  const [cookies, setCookie] = useCookies(null);

  console.log(cookies);

  const viewLogin = (status) => {
    setError(null);
    setIsLogin(status);
  };

  const handleSubmit = async (e, endPoint) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      setError("make sure passwords match");
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/${endPoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      if (data.detail) {
        setError(data.detail);
      } else {
        setCookie("Email", data.email);
        setCookie("AuthToken", data.token);
        
        window.location.reload();
      }

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form>
          <h2>{isLogin ? "Please Log in" : "please sign up"}</h2>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLogin && (
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              value={confirmPassword}
              placeholder="confirm password"
            />
          )}
          <input
            type="submit"
            className="create"
            onClick={(e) => handleSubmit(e, isLogin ? "login" : "signup")}
          />
          {error && <p>{error}</p>}
        </form>
        <div className="auth-options">
          <button
            onClick={() => viewLogin(false)}
            style={{ backgroundColor: !isLogin ? "white" : "grey" }}
          >
            Sign Up
          </button>
          <button
            style={{ backgroundColor: isLogin ? "white" : "grey" }}
            onClick={() => viewLogin(true)}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
