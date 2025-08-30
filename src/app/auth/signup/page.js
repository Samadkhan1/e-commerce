"use client";
import React, { useState } from "react";
import { useAuth } from "../../../../providers/authProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignUp = () => {
  const [firstName, setfistName] = useState("");
  const [lastName, setlastName] = useState("");
  const [userName, setuserName] = useState("");
  const [email, setemail] = useState("");
  const [gender, setgender] = useState("");
  const [password, setpassword] = useState("");
  const [ValidationError, setValidationError] = useState("");

  const { SignUp } = useAuth();
  const router = useRouter();

  function validatePassword(password) {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasspecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
      password
    );
    const hasNumber = /[0-9]/.test(password);

    return {
      isValid: hasLowerCase && hasUpperCase && hasspecialCharacter && hasNumber,
      hasLowerCase,
      hasUpperCase,
      hasNumber,
      hasspecialCharacter,
    };
  }

  function ValidateEmail(email) {
    const validateAtTheRate = /[@]/.test(email);
    const validateDot = /[.]/.test(email);
    return {
      isValid: validateAtTheRate && validateDot,
    };
  }

  function Authenticate() {
    const passwordValidation = validatePassword(password);
    const emailValidation = ValidateEmail(email);
    if (passwordValidation.isValid && emailValidation.isValid) {
      try {
        const user = SignUp(
          firstName,
          lastName,
          email,
          gender,
          password,
          userName
        );
        if (user) {
          router.push("/auth/login");
        }
      } catch (error) {
        console.log(error);
      }
    } else if (!email && !password && !firstName && !lastName && !userName) {
      setValidationError("Please Fill All The Above Fields");
    } else {
      console.log("password is missing");
      if (!emailValidation.isValid)
        setValidationError("Please Enter a Valid E-mail Address");
      if (!passwordValidation.hasLowerCase)
        setValidationError("The Password Must Contain Atleat 1 LowerCase");
      if (!passwordValidation.hasUpperCase)
        setValidationError("The Password Must Contain Atleat 1 UpperCase");
      if (!passwordValidation.hasNumber)
        setValidationError("The Password Must Contain Atleat 1 Number");
      if (!passwordValidation.hasspecialCharacter)
        setValidationError(
          "The Password Must Contain Atleat 1 Special Character"
        );
    }
  }

  return (
    <section
      style={{ backgroundColor: "gray" }}
      className=" text-white px-2 flex w-[100%] items-center justify-center min-h-screen"
    >
      <div className="bg-neutral-600 p-6 rounded-3xl w-[400px] flex flex-col">
        <h1 className="text-3xl font-semibold m-4">Sign Up</h1>
        <div className="flex">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setfistName(e.target.value)}
            placeholder="First Name"
            className="border-b-1  my-1 mx-4 w-[50%] p-3 "
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
            placeholder="Last Name"
            className="border-b-1  my-1 mx-4 w-[50%] p-3 "
          />
        </div>
        <input
          type="text"
          value={userName}
          onChange={(e) => setuserName(e.target.value)}
          placeholder="User Name"
          className="border-b-1  my-1 mx-4 w-[90%] p-3 "
        />
        <select
          onChange={(e) => setgender(e.target.value)}
          className="bg-gray-200 p-3 text-black  m-3 w-[90%]"
        >
          <option value={"#"}>gender</option>
          <option value={"male"}>Male</option>
          <option value={"female"}>Female</option>
        </select>
        <input
          value={email}
          onChange={(e) => setemail(e.target.value)}
          type="email"
          placeholder="Email"
          className="border-b-1  my-1 mx-4 w-[90%] p-3 "
        />
        <input
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="border-b-1  my-1 mx-4 w-[90%] p-3"
        />
        <div className="w-full flex items-center justify-center ">
          <p className="text-red-400  text-center">{ValidationError}</p>
        </div>
        <button
          onClick={() => Authenticate()}
          className="bg-gray-200 text-black text-xl font-semibold w-[90%] mx-4 mt-8 mb-4 p-2 rounded-2xl hover:bg-gray-300 hover:cursor-pointer"
        >
          Sign Up
        </button>
        <p className="text-center">
          Already Have An Account?{" "}
          <Link
            href={"/auth/login"}
            prefetch={false}
            className="text-blue-300"
          >
            Log In
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignUp;
