"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Loader from "./loader";

export const dynamic = 'force-dynamic'

const ProductSection = () => {
  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(true);
  const [error,setError] = useState(false)

  useEffect(() => {
    try {
      axios.get("https://dummyjson.com/products").then((resp) => {
        setproducts(resp.data.products);
        setloading(false);
      });
    } catch (error) {
      console.error(error)
      setError(true)
    }
  }, []);
  if (error === true) {
    return (
      <div>
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
          <h1>Error Loading Products :(</h1>
        </div>
      </div>
    );
  }
  if (loading === true) {
    return (
      <div>
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
          <Loader />
        </div>
      </div>
    );
  }
  return (
    <div className="py-10 flex flex-col items-center ">
      <h1 className="text-center  text-gray-700 mt-5 font-semibold text-5xl underline">
        Featured Products
      </h1>
      <div className="grid grid-cols-2 py-8 px-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((prod) => (
          <Link
            href={`/products/${prod.id}`}
            className="bg-gray-100 hover:scale-105 transition-all rounded-lg overflow-hidden shadow-md"
            key={prod.id}
          >
            <div className="h-48 overflow-hidden">
              <img
                src={prod.thumbnail}
                alt={prod.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h1 className="text-lg font-semibold truncate">{prod.title}</h1>
              <h1 className="text-sm text-gray-500 capitalize">
                {prod.category}
              </h1>
              <div className="flex justify-between mt-2">
                <p>${prod.price}</p>
                <p>{prod.rating}⭐</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Link
        href="/shop"
        className=" bg-black text-white p-2 mt-5 w-52 px-10 py-3 transition-all duration-200 hover:bg-transparent text-center hover:text-black border-2 cursor-pointer"
      >
        See More
      </Link>
    </div>
  );
};

export default ProductSection;
