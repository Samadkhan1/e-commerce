"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Loader from "../../../components/loader";
import Link from "next/link";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";

const Groceries = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [fetchURL, setfetchURL] = useState(
    "https://dummyjson.com/products/category/groceries"
  );

  async function FetchProducts(url) {
    try {
      setLoading(true);
      await axios
        .get(url)
        .then((response) => setProducts(response.data.products));
    } catch (error) {
      console.error("Error fetching Products:", error);
    } finally {
      setLoading(false);
    }
  }

  function categorySearch(categoryURL) {
    FetchProducts(categoryURL);
  }
  function handleSearch() {
    FetchProducts(`https://dummyjson.com/products/search?q=${searchQuery}`);
  }

  useEffect(() => {
    FetchProducts(fetchURL);
  }, [fetchURL]);

  return (
    <section>
      <Navbar />
      <nav className="w-full bg-gray-200 flex flex-col md:flex-row justify-between p-4 gap-4">
        <div className="flex items-center">
          <input
            placeholder="Search"
            className="bg-white rounded-lg p-2 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            className="p-2 ml-2 hover:cursor-pointer bg-gray-500 text-white rounded"
            onClick={handleSearch}
          >
            <FaSearch />
          </button>
        </div>
        <div>
          <select
            className="p-2 rounded border hover:border-blue-500 focus:border-blue-500 w-full"
            onChange={(e) => categorySearch(e.target.value)}
          >
            <option value="https://dummyjson.com/products/category/groceries">
              Groceries
            </option>
            <option value="https://dummyjson.com/products/category/kitchen-accessories">
              Kitchen Accessories
            </option>
            <option value="https://dummyjson.com/products/category/home-decoration">
              Home Decor
            </option>
          </select>
        </div>
      </nav>
      <section className="container mx-auto p-4">
        <h1 className="text-center text-4xl font-semibold my-5">Products</h1>
        {loading ? (
          <div className="flex items-center justify-center w-full h-[60vh]">
            <Loader />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map((prod) => (
              <Link
                href={`/products/${prod.id}`}
                className="bg-white hover:scale-105 transition-all rounded-lg overflow-hidden shadow-md"
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
                  <h1 className="text-lg font-semibold truncate">
                    {prod.title}
                  </h1>
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
        )}
      </section>
      <Footer/>
    </section>
  );
};

export default Groceries;
