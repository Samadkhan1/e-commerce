"use client";
import React from "react";
import { useAuth } from "../../../providers/authProvider";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import { useRouter } from "next/navigation";
import { FaArrowRight, FaShoppingCart } from "react-icons/fa";
import Link from "next/link";

const Profile = () => {
  const { user, logout } = useAuth();

  const router = useRouter();

  async function logUserOut() {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <Navbar />
      <section className="min-h-screen flex  justify-center bg-gray-200">
        <div className="w-full md:w-[80%]">
          <div className="bg-gray-400 p-4 md:p-8 flex items-center ">
            <div className="bg-gray-200 rounded-full overflow-hidden">
              <img src={user?.image} alt={user?.firstName} />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-semibold ml-5">
                {user?.firstName} {user?.lastName}
              </h1>
              <h1 className="text-small md:text-xl font-light ml-5">
                User Name: {user?.username}
              </h1>
            </div>
          </div>
          <div className="p-2 md:p-10 bg-gray-300">
            <div>
              <h1 className="text-lg md:text-xl font-normal ml-2 md:ml-5">
                First Name: {user?.firstName}
              </h1>
              <h1 className="text-lg md:text-xl font-normal ml-2 md:ml-5">
                Last Name: {user?.lastName}
              </h1>
              <h1 className="text-lg md:text-xl font-normal ml-2 md:ml-5">
                Gender: {user?.gender}
              </h1>
            </div>
            <div className="mt-2">
              <h1 className="text-lg md:text-xl font-normal ml-2 md:ml-5">Email: {user?.email}</h1>
            </div>
            <div className="flex">
              <button
                onClick={logUserOut}
                className=" m-5 flex items-center bg-red-600 font-semibold text-white px-4 py-2 rounded-xl hover:bg-red-500"
              >
                Logout <FaArrowRight className="ml-1" />
              </button>
              <Link href={'/cart'} className="my-5 flex items-center bg-gray-600  hover:bg-gray-500 font-semibold text-white px-4 py-2 rounded-xl">
                Cart <FaShoppingCart className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Profile;
