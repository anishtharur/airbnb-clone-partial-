import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post("/login", { email, password });
      alert("Login Successful");
      setRedirect(true);
    } catch (e) {
      alert("Login failed");
    }
  };
  if (redirect) {
    console.log("navigating");
    return <Navigate to={"/"} />;
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32">
        <h1 className="text-center text-4xl mb-4 font-medium">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary">Login</button>
          <div className="text-center pt-2 text-slate-600	">
            Don't have an account?{" "}
            <Link to={"/register"} className="text-primary underline">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
