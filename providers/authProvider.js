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
      const response = await axios.post(
        "https://dummyjson.com/auth/login",
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          // Remove withCredentials unless specifically needed
          // withCredentials: true
        }
      );

      const userData = response.data;
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return userData;
    } catch (error) {
      console.error("Login error:", error);
      throw error; // Re-throw to handle in components
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/");
  };

  const SignUp = async(email, gender, firstName, lastName)=> {
    const id = Date.now();
    try {
        const data = await {
      id: id,
      username: firstName,
      email: email,
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      image:
     "https://cdn-icons-png.flaticon.com/128/9408/9408175.png",
    };
     localStorage.setItem("user", JSON.stringify(data));
     setUser(data)
    router.push('/')
    return data
    } catch (error) {
      console.log(error)
      throw error
    }
  }


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
