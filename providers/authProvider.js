"use client";
import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(storedUser);
      } catch (error) {
        console.error("Failed to parse stored user data", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

const login = async (username, password) => {
  try {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    
    if (user && user.username === username && user.password === password) {
      console.log("Logged in from stored credentials");
      return user;
    }

    const response = await axios.post('/api/login', {
      username,
      password
    });

    const userData = response.data;
    
    return userData;
    
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/");
  };

  const SignUp = async (
    firstName,
    lastName,
    email,
    gender,
    password,
    username
  ) => {
    const newUserData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      gender: gender,
      password: password,
      username: username,
    };

    try {
      localStorage.setItem("user", JSON.stringify(newUserData));
      setUser(newUserData);
      return newUserData;
    } catch (error) {
      console.error("Error signing up:", error);

      const errorMessage =
        error.response?.data?.message || error.message || "Sign up failed";

      throw new Error(errorMessage);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, SignUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
