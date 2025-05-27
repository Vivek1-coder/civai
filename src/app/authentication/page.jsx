"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useContext, useState, useEffect } from "react";
import "./Auth.css";
import { storeContext } from "@/app/authentication/AuthContext";
import { ToastContainer } from "react-toastify";

export default function Auth() {
  const router = useRouter();
  const [page, setPage] = useState("Login");
  const {
    credentials,
    setCredentials,
    handleSignup,
    handleLogin,
    setAuthorization,
    authorization,
  } = useContext(storeContext);
  const pathname = usePathname();

  const handleChange = (e) => {
    setCredentials((pre) => {
      return { ...pre, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (page == "Login") {
      handleLogin();
    } else {
      handleSignup();
    }
    setCredentials({
      username: "",
      email: "",
      password: "",
    });
  };

  const flipPage = () => {
    if (page == "Login") {
      setPage("Sign up");
    } else {
      setPage("Login");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      router.push("/");
      setAuthorization(true);
    }
  }, [authorization, pathname]);

  return (
    <div className="auth">
      <div className="auth-container">
        <div className="auth-left"></div>
        <div className="auth-right">
          <form onSubmit={handleSubmit}>
            <h1>{page == "Login" ? "Login" : "Sign up"}</h1>
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
            <div className="auth-row">
              {/* <label>
                <input type="checkbox" />
                <p>Remember me*</p>
              </label> */}
            </div>
            <button>{page == "Login" ? "Login" : "Sign up"}</button>
            <div className="auth-row">
              {" "}
              {page === "Login" && (
                <p onClick={flipPage}>
                  Don't have an account ? <span className="grey">Sign up</span>
                </p>
              )}
              {page !== "Login" && (
                <p onClick={flipPage}>
                  Already have an account ? <span className="grey">Login</span>{" "}
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
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
