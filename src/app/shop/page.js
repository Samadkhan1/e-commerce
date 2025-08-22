"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Loader from "../../../components/loader";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchProducts = async (url) => {
    try {
      setLoading(true);
      const response = await axios.get(url);
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchByCategory = (category) => {
    fetchProducts(`https://dummyjson.com/products/category/${category}`);
  };

  const handleSearch = () => {
    fetchProducts(`https://dummyjson.com/products/search?q=${searchQuery}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await axios.get(
          "https://dummyjson.com/products/categories"
        );
        setCategories(categoriesResponse.data);
        await fetchProducts("https://dummyjson.com/products?limit=10");
      } catch (error) {
        console.error("Error initializing data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar/>
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
            onChange={(e) => searchByCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat, index) => (
              <option value={cat.slug} key={index}>
                {cat.name}
              </option>
            ))}
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
        )}
      </section>
      <Footer/>
    </div>
  );
};

export default Shop;