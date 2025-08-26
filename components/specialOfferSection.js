'use client'
import React from "react";

const SpecialOfferSection = () => {
  return (
    <div>
      <div className="bg-[url('https://images.unsplash.com/photo-1553614186-5e11ee67066b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzR8fGJsYWNrJTIwYW5kJTIwd2hpdGUlMjBmYXNoaW9ufGVufDB8MHwwfHx8MA%3D%3D')] h-110 bg-fixed bg-center bg-cover flex flex-col items-left justify-end p-10">
        <h1 className="text-white text-5xl  font-semibold">
          Limited Time Offer
        </h1>
        <h2 className="text-white text-2xl mt-5 font-semibold">
          Buy Any T-Shirt On 20% Off
        </h2>
        <button className="mt-5 transition-all duration-200 bg-white border-2 border-white cursor-pointer  hover:bg-transparent  hover:text-white md:mr-4   text-black px-6 py-3 w-52">
          SHOP NOW
        </button>
      </div>
    </div>
  );
};

export default SpecialOfferSection;
