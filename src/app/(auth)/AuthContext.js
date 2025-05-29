"use client";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const storeContext = createContext();

const ContextProvider = ({ children }) => {
  const router = useRouter();

  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [authorization, setAuthorization] = useState(false);

  const errMsg = (msg) => toast.error(msg);
  const successMsg = (msg) => toast.success(msg);

  const handleSignup = async () => {
    try {
      const response = await fetch("api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: credentials.username,
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const parsedResponse = await response.json();
      if (!parsedResponse.success) {
        return errMsg(parsedResponse.message);
      }

      localStorage.setItem("auth", parsedResponse.token);
      setAuthorization(true);
      setCredentials({ username: "", email: "", password: "" });
      successMsg(parsedResponse.message);
      router.push("/u");
    } catch (err) {
      errMsg("Oops! Some error occurred during signup.");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const parsedResponse = await response.json();
      if (!parsedResponse.success) {
        return errMsg(parsedResponse.message);
      }

      localStorage.setItem("auth", parsedResponse.token);
      setAuthorization(true);
      setCredentials({ username: "", email: "", password: "" });
      successMsg(parsedResponse.message);
      router.push("/u");
    } catch (err) {
      errMsg("Oops! Some error occurred during login.");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("auth")) {
      setAuthorization(true);
    }
  }, []);

  return (
    <storeContext.Provider
      value={{
        credentials,
        setCredentials,
        handleSignup,
        handleLogin,
        errMsg,
        successMsg,
        authorization,
        setAuthorization,
      }}
    >
      {children}
    </storeContext.Provider>
  );
};

export { storeContext, ContextProvider };