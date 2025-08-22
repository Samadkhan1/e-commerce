"use client";
import React, { useState } from "react";
import { useAuth } from "../../../../providers/authProvider";

const SignUp = () => {
  const [firstName, setfistName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [gender, setgender] = useState("");

  const {SignUp} = useAuth()

  function Authenticate() {
    try {
        SignUp(email,gender,firstName,lastName)
        
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <section
      style={{ backgroundColor: "gray" }}
      className=" text-white px-2 flex items-center justify-center min-h-screen"
    >
      <div className="bg-neutral-600 p-6 rounded-3xl w-[400px] flex flex-col">
        <h1 className="text-3xl font-semibold m-4">Sign Up</h1>
        <div className="flex">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setfistName(e.target.value)}
            placeholder="First Name"
            className="border-b-1  my-2 mx-4 w-[50%] p-3 "
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
            placeholder="Last Name"
            className="border-b-1  my-2 mx-4 w-[50%] p-3 "
          />
        </div>
        <select onChange={(e)=>setgender(e.target.value)} className="bg-gray-200 p-3 text-black  m-5">
          <option value={"#"}>gender</option>
          <option value={"male"}>Male</option>
          <option value={"female"}>Female</option>
        </select>
        <input
          value={email}
          onChange={(e) => setemail(e.target.value)}
          type="email"
          placeholder="Email"
          className="border-b-1  my-2 mx-4 w-[90%] p-3 "
        />
        <input
          type="password"
          placeholder="Password"
          className="border-b-1  my-2 mx-4 w-[90%] p-3"
        />
        <button
          onClick={Authenticate}
          className="bg-gray-200 text-black text-xl font-semibold w-[90%] mx-4 mt-8 mb-4 p-2 rounded-2xl hover:bg-gray-300 hover:cursor-pointer"
        >
          Sign Up
        </button>
      </div>
    </section>
  );
};

export default SignUp;
