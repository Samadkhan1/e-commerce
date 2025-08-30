import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

const BackButton = () => {
  const router = useRouter();
  function back() {
    router.back();
  }
  return (
    <div className="flex items-center">
      <button  className="flex items-center" onClick={back}>
        <FaArrowLeft className="text-lg md:mx-2  cursor-pointer hover:bg-gray-300 p-2 h-[40px] w-[40px] rounded-full" />
      </button>
    </div>
  );
};

export default BackButton;
