"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Navbar from "../../../../components/navbar";
import Loader from "../../../../components/loader";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FaStar, FaUser } from "react-icons/fa";
import Footer from "../../../../components/footer";

const ProductPage = () => {
  const { productid } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/${productid}`
        );
        setProduct(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productid]);

  const calculateDiscount = (discountPercent, originalPrice) => {
    const discountAmount = (discountPercent / 100) * originalPrice;
    return (originalPrice - discountAmount).toFixed(2);
  };

  const getCart = () => {
    try {
      const cart = localStorage.getItem("cart");
      return cart ? JSON.parse(cart) : [];
    } catch (error) {
      console.log("error getting cart", error);
      return [];
    }
  };

  const addToCart = (product, quantity = 1) => {
    const existingItems = getCart();
    const checkProduct = existingItems.findIndex(
      (item) => item.id === product.id
    );
    if (checkProduct >= 0) {
      existingItems[checkProduct].quantity += 1;
    } else {
      existingItems.unshift({
        ...product,
        quantity: quantity,
        addedAt: new Date().toISOString(),
      });
    }
    localStorage.setItem("cart", JSON.stringify(existingItems));
  };

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <h1 className="text-center">{error}</h1>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-200">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-gray-200 text-gray-800  min-h-screen">
      <Navbar />
      <div className="container mx-auto p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 h-fit bg-gray-300  p-8 rounded-lg">
            <Slider {...Settings}>
              {product?.images?.map((image, index) => (
                <div
                  key={index}
                  className="h-64 md:h-96 flex items-center justify-center"
                  style={{
                    display: "flex !important",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    className="max-h-full max-w-full  object-contain"
                    src={image}
                    alt={`${product.title} - ${index + 1}`}
                    onError={(e) => {
                      e.target.src = "/placeholder-image.jpg";
                    }}
                    style={{
                      margin: "0 auto",
                      display: "block",
                    }}
                  />
                </div>
              ))}
            </Slider>
          </div>

          <div className="md:w-1/2 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold">{product?.title}</h1>
                <p className="text-gray-500 capitalize">{product?.category}</p>
              </div>
              <div className="flex items-center bg-yellow-100 px-2 py-1 rounded">
                <span className="text-yellow-800 font-medium">
                  {product?.rating}
                </span>
                <span className="ml-1">⭐</span>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700">
                <span className="font-semibold">Brand:</span> {product?.brand}
              </p>
              <p className="text-gray-800">{product?.description}</p>
              <p className="text-gray-600 font-medium">
                Stock: {product?.stock} available
              </p>

              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-gray-900">
                  $
                  {calculateDiscount(
                    product?.discountPercentage || 0,
                    product?.price || 0
                  )}
                </span>
                {product?.discountPercentage > 0 && (
                  <>
                    <span className="text-lg text-gray-500 line-through">
                      ${product?.price}
                    </span>
                    <span className="text-green-600 font-medium">
                      {product?.discountPercentage}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <button className="bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 px-6 rounded transition">
                Buy Now
              </button>
              <button
                onClick={() => {
                  addToCart(product);
                }}
                className="border border-gray-800 hover:bg-gray-100 font-medium py-3 px-6 rounded transition"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <div className="mt-3">
            <h1 className="text-xl font-semibold">Description:</h1>
            <p>{product.description}</p>
            <p className="ml-4">
              <span className="text-lg font-semibold mr-2">Weight:</span>
              {product?.weight}
            </p>
            <p className="ml-4">
              <span className="text-lg font-semibold mr-2">Dimensions:</span>
              Width: {product?.dimensions.width} , Height:
              {product?.dimensions.height} , Depth: {product?.dimensions.depth}
            </p>
            <p className="ml-4">
              <span className="text-lg font-semibold mr-2">
                Minimum Order Quantity:
              </span>
              {product?.minimumOrderQuantity}
            </p>
            <p className="ml-0 mt-5">
              <span className="text-lg font-semibold mr-2">Return Policy:</span>
              {product?.returnPolicy}
            </p>
          </div>
          <div className="mt-3">
            <h1 className="text-xl font-semibold">Reviews:</h1>
            <div>
              {product?.reviews.map((review, index) => (
                <div
                  key={index}
                  className="mt-3 flex items-center p-5 bg-gray-300 rounded-2xl"
                >
                  <div className="">
                    <FaUser className="text-5xl ml-3 text-gray-100" />
                  </div>
                  <div>
                    <h1 className="ml-5 font-semibold text-gray-700">
                      {review.reviewerName}
                    </h1>
                    <h1 className="ml-5 text-gray-700">{review.comment}</h1>
                    <h1 className="ml-5 flex items-center text-2xl mt-3 text-gray-700">
                      <FaStar className="text-yellow-500" /> {review.rating}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
