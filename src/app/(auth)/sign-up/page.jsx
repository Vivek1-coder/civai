"use client";

import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./Auth.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { storeContext } from "../AuthContext";
import Navbar from "../../../components/Navbar/Navbar2";

export default function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { credentials, setCredentials, handleSignup, setAuthorization } =
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
    await handleSignup();
    setLoading(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("auth")) {
      setAuthorization(true);
      router.push("/u");
    }
  }, []);

  return (
    <main className="relative h-screen w-screen  ">
              <section className="w-full flex justify-center">
                <Navbar />
              </section>
    <div className="relative auth h-full overflow-clip bg-transparent bg-gradient-to-br from-black via-zinc-800 to-black text-white">
      <div className="auth-container absolute h-full  overflow-clip">
        <div className="h-full flex jsutify-center items-center w-full -z-10  ">
          <img src="/authbg3.jpg" className=" h-full w-screen" />
        </div>
        <div className="text-white flex justify-center items-center h-screen overflow-clip">
          <form
            onSubmit={handleSubmit}
            className=" flex flex-col justify-center itmes-center max-w-lg mx-auto mt-10 p-6 shadow-lg rounded-xl space-y-6 h-3/4 w-3/4
             bg-white/10 backdrop-blur-md border border-white/30 text-white"
          >
            <h1 className="text-2xl font-bold text-center text-white">
              Sign Up
            </h1>

            <input
              type="text"
              placeholder="Username *"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="Email Address *"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="password"
              placeholder="Password *"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full
               py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200 disabled:opacity-60 "
            >
              {loading ? "Processing..." : "Sign Up"}
            </button>

            <div className="text-center text-sm text-gray-200 h-20">
              Already have an account?{" "}
              <span
                onClick={() => router.push("/login")}
                className="text-blue-400 cursor-pointer hover:underline"
              >
                Login
              </span>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
    </main>
  );
}
