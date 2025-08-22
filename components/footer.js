import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-around md:px-10 lg:px-40 gap-5 md:gap-15 py-10 h-auto bg-gray-300">
      <div>
        <h2 className="font-semibold text-2xl text-gray-800" >Quick Links</h2>
        <ul>
          <li>
            <Link href="/" className="text-gray-500 hover:text-red-600">
              Home
            </Link>
          </li>
          <li>
            <Link href="/" className="text-gray-500 hover:text-red-600">
              Shop
            </Link>
          </li>
          <li>
            <Link href="/" className="text-gray-500 hover:text-red-600">
              About
            </Link>
          </li>
          <li>
            <Link href="/" className="text-gray-500 hover:text-red-600">
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <div >
        <h2 className="font-semibold text-2xl text-gray-800">For Her</h2>
        <ul>
          <li>
            <Link href="/" className="text-gray-500 hover:text-red-600">
              Clothes
            </Link>
          </li>
          <li>
            <Link href="/" className="text-gray-500 hover:text-red-600">
              Shoes
            </Link>
          </li>
          <li>
            <Link href="/" className="text-gray-500 hover:text-red-600">
              Accessories
            </Link>
          </li>
          <li>
            <Link href="/" className="text-gray-500 hover:text-red-600">
              Jewelry
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h2 className="font-semibold text-2xl text-gray-800" >For Him</h2>
        <ul>
          <li>
            <Link href="/" className="text-gray-500 hover:text-red-600">
              Clothes
            </Link>
          </li>
          <li>
            <Link href="/" className="text-gray-500 hover:text-red-600">
              Shoes
            </Link>
          </li>
          <li>
            <Link href="/" className="text-gray-500 hover:text-red-600">
              Accessories
            </Link>
          </li>
          <li>
            <Link href="/" className="text-gray-500 hover:text-red-600">
              Jewelry
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h2 className="font-semibold text-2xl text-gray-800">Contact Us</h2>
        <ul>
          <li>
            <Link href="/" className="text-gray-500 hover:text-red-600">
              Email: example@gmail.com
            </Link>
          </li>
          <li>
            <Link href="/" className="text-gray-500 hover:text-red-600">
              Phone: 123-456-7890
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
