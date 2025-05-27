"use client"
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const storeContext = createContext();


const ContextProvider = ({ children }) => {
  
  
  const errMsg = (msg) => {
    return toast.error(msg);
  };
  
  const successMsg = (msg) => {
    return toast.success(msg);
  };

  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const [authorization,setAuthorization] =useState(false);

  const handleSignup = async () => {
    try {
      const response = await fetch("http://localhost:8000/user/signup", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          username: credentials.username.toString(),
          email: credentials.email.toString(),
          password: credentials.password.toString(),
        }),
      });
      const parsedResponse = await response.json();
      if (!parsedResponse.success) {
        return errMsg(parsedResponse.message);
      }
      console.log(parsedResponse);
      localStorage.setItem("auth", parsedResponse.token);
      setAuthorization(true);
      router.push("/");
      return successMsg(parsedResponse.message);
    } catch (err) {
      return errMsg("Oops ! Some error Occurs");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8000/user/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email.toString(),
          password: credentials.password.toString(),
        }),
      });
      const parsedResponse = await response.json();
      if (!parsedResponse.success) {
        return errMsg(parsedResponse.message);
      }
      localStorage.setItem("auth", parsedResponse.token);
      setAuthorization(true);
      router.push("/");
      return successMsg(parsedResponse.message);

    } catch (err) {
      return errMsg("Oops ! some error Occurs");
    }
  };

  useEffect(()=>{
    if(localStorage.getItem("auth")){
      setAuthorization(true)
    }else {
      router.push("/authentication")
    }
  })

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
        setAuthorization
      }}
    >
      {children}
    </storeContext.Provider>
  );
};

export { storeContext, ContextProvider };
