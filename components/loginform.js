"use client";
import React, { useState } from "react";
import { useAuth } from "../providers/authProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const router = useRouter();

  const [userName, setuserName] = useState("");
  const [Password, setPassword] = useState("");
  const [logInError, setlogInError] = useState("");
  const { login } = useAuth();

  // const username = "emilys";
  // const password = "emilyspass";
  async function Authenticate() {
    login(userName, Password)
      .then((data) => {
        console.log(data);
        router.push("/");
      })
      .catch((error) => setlogInError(error.response.data.message));
  }

  if (logInError) {
    setTimeout(() => {
      setlogInError("");
    }, 5000);
  }
  return (
    <section
      style={{ backgroundColor: "gray" }}
      className=" text-white px-3 flex items-center justify-center min-h-screen"
    >
      <div className="bg-neutral-600 p-6 rounded-3xl w-[400px] flex flex-col justify-center items-center">
        <h1 className="text-3xl font-semibold m-4">Login</h1>
        <input
          value={userName}
          onChange={(e) => setuserName(e.target.value)}
          type="text"
          placeholder="User name"
          className="border-b-1  my-2 mx-4 w-[90%] p-3 "
        />
        <input
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="border-b-1  my-2 mx-4 w-[90%] p-3"
        />
        <button
          onClick={Authenticate}
          className="bg-gray-200 text-black text-xl font-semibold w-[90%]  mx-4 mt-8 mb-4 p-2 rounded-2xl hover:bg-gray-300 hover:cursor-pointer"
        >
          Login
        </button>
        <p className="text-red-400 my-2">{logInError}</p>
        <p className="text-center">
          Don't have an account{" "}
          <Link className="text-blue-500" href={"/auth/signup"}>
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
