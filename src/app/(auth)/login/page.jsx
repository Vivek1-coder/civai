"use client";

import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./Auth.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { storeContext } from "../AuthContext";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { credentials, setCredentials, handleLogin, setAuthorization } =
    useContext(storeContext);

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await handleLogin();
    setLoading(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("auth")) {
      setAuthorization(true);
      router.push("/");
    }
  }, []);

  return (
    <div className="auth">
      <div className="auth-container">
        <div className="auth-left"></div>
        <div className="auth-right">
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>

            <input
              type="text"
              placeholder="Email Address *"
              name="email"
              value={credentials.email}
              onChange={handleChange}
            />

            <input
              type="password"
              placeholder="Password *"
              name="password"
              value={credentials.password}
              onChange={handleChange}
            />

            <div className="auth-row"></div>

            <button type="submit" disabled={loading}>
              {loading ? "Processing..." : "Login"}
            </button>

            <div className="auth-row">
              <p onClick={() => router.push("/sign-up")}>
                Don't have an account? <span className="grey">Sign up</span>
              </p>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}
