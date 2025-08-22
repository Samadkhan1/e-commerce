import React from "react";
import ProductSection from "../../components/productSection";
import Link from "next/link";
import SpecialOfferSection from "../../components/specialOfferSection";
import AboutProducts from "../../components/aboutProducts";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className='  h-screen md:h-[550px] bg-center bg-fixed bg-cover z-0 bg-[url("https://images.unsplash.com/photo-1536924430914-91f9e2041b83?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxhY2slMjBhbmQlMjB3aGl0ZSUyMGZhc2hpb258ZW58MHx8MHx8fDA%3D")] md:bg-[url("https://images.unsplash.com/photo-1567631643547-67a2dd59f266?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjA5fHxmYXNoaW9ufGVufDB8fDB8fHww")]'>
        <div className="text-white flex flex-col  p-5 md:p-10  justify-center h-120">
          <h1 className="flex font-semibold flex-col text-3xl text-center md:text-left md:text-7xl">
            Raining Offers For <br /> Hot Summer!
          </h1>
          <h3 className="text-2xl md:text-3xl font-semibold mt-7 text-center md:text-left">
            25% Off On All Products
          </h3>
          <div className="mt-7 flex flex-col md:flex-row ">
            <Link
              href={"/shop"}
              className="transition-all text-center duration-200 bg-white border-2 mt-2 border-white cursor-pointer  hover:bg-transparent  hover:text-white md:mr-4   text-black px-6 py-3"
            >
              SHOP NOW
            </Link>
            <Link
              href={"/shop"}
              className="transition-all text-center duration-200 bg-transparent border-white  mt-2 border-2 hover:bg-white hover:border-white hover:text-black cursor-pointer text-white px-6 py-3"
            >
              FIND MORE
            </Link>
          </div>
        </div>
      </div>
      <div className="pt-10 bg-gray-200">
        <h1 className="font-semibold text-gray-800 text-6xl text-center p-5">
          Explore
        </h1>
        <div className="flex flex-col justify-between md:flex-row items-center  px-3 md:px-10 py-7">
          <div className="text-white mt-4 m-2 md:w-95 w-full h-110 bg-center bg-cover bg-[url('https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjE4fHxmYXNoaW9ufGVufDB8fDB8fHww')]">
            <div className="bg-black/50 h-full flex flex-col items-baseline justify-end px-6 py-8">
              <h1 className="text-3xl m-2">Looking for Shoes?</h1>
              <p className="m-1">Step into style, stride with confidence.</p>
              <Link
                href={"/shop"}
                className="transition-all duration-200 bg-white border-2 mt-2 border-white cursor-pointer  hover:bg-transparent  hover:text-white md:mr-4   text-black px-6 py-3"
              >
                Shop Now
              </Link>
            </div>
          </div>
          <div className="text-white mt-4 m-2 md:w-95 w-full h-110 bg-center bg-cover bg-[url('https://images.unsplash.com/photo-1523297467724-f6758d7124c5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGJsYWNrJTIwYW5kJTIwd2hpdGUlMjBmYXNoaW9ufGVufDB8fDB8fHww')]">
            <div className="bg-black/50 h-full flex flex-col items-baseline justify-end px-6 py-8">
              <h1 className="text-3xl m-2">Latest Eyewear For You</h1>
              <p className="m-1">Sharp looks for sharper vision.</p>
              <button className="transition-all duration-200 bg-white border-2 mt-2 border-white cursor-pointer  hover:bg-transparent  hover:text-white md:mr-4   text-black px-6 py-3">
                Shop Now
              </button>
            </div>
          </div>
          <div className="text-white mt-4 m-2  md:w-95 w-full h-110 bg-center bg-cover bg-[url('https://images.unsplash.com/photo-1733470381591-c5dfb9df3c3d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGFraXN0YW5pJTIwZHJlc3N8ZW58MHx8MHx8fDA%3D')]">
            <div className="bg-black/50 h-full flex flex-col items-baseline justify-end px-6 py-8">
              <h1 className="text-3xl m-2">Cloths</h1>
              <p className="m-1">Elevate your everyday style.</p>
              <button className="transition-all duration-200  bg-white border-2 mt-2 border-white cursor-pointer  hover:bg-transparent  hover:text-white md:mr-4   text-black px-6 py-3">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <section>
        <ProductSection />
        <SpecialOfferSection />
        <AboutProducts />
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;
