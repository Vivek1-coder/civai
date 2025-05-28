"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useContext, useState, useEffect } from "react";
import "./Auth.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { storeContext } from "./AuthContext";

export default function Auth() {
  const router = useRouter();
  const pathname = usePathname();
  const [page, setPage] = useState("Login");
  const [loading, setLoading] = useState(false);

  const {
    credentials,
    setCredentials,
    handleSignup,
    handleLogin,
    setAuthorization,
    authorization,
  } = useContext(storeContext);

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (page === "Login") {
      await handleLogin();
    } else {
      await handleSignup();
    }
    setLoading(false);
  };

  const flipPage = () => {
    setPage((prev) => (prev === "Login" ? "Sign up" : "Login"));
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
            <h1>{page === "Login" ? "Login" : "Sign up"}</h1>

            {page !== "Login" && (
              <input
                type="text"
                placeholder="Username *"
                name="username"
                value={credentials.username}
                onChange={handleChange}
              />
            )}

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
              {loading
                ? "Processing..."
                : page === "Login"
                ? "Login"
                : "Sign up"}
            </button>

            <div className="auth-row">
              {page === "Login" ? (
                <p onClick={flipPage}>
                  Don't have an account? <span className="grey">Sign up</span>
                </p>
              ) : (
                <p onClick={flipPage}>
                  Already have an account? <span className="grey">Login</span>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
