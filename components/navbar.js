"use client";
import Link from "next/link";
import { useAuth } from "../providers/authProvider";
import { FaBars, FaShoppingCart, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [navbarIsOpen, setNavbarIsOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [isClient, setIsClient] = useState(false);

  // Initialize client-side and load cart
  useEffect(() => {
    setIsClient(true);
    getCart();
  }, []);

  // Get cart from localStorage (client-side only)
  const getCart = () => {
    if (typeof window === 'undefined') return [];
    try {
      const cartData = localStorage.getItem("cart");
      const parsedCart = cartData ? JSON.parse(cartData) : [];
      setCart(parsedCart);
      return parsedCart;
    } catch (error) {
      console.log("Error getting cart", error);
      setCart([]);
      return [];
    }
  };

  // Save cart to localStorage
  const saveCart = (cartData) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem("cart", JSON.stringify(cartData));
    } catch (error) {
      console.log("Error saving data to localStorage: ", error);
    }
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    if (typeof window === 'undefined') return;
    try {
      const currentCart = getCart();
      const newCart = currentCart.filter((item) => item.id !== id);
      setCart(newCart);
      saveCart(newCart);
    } catch (error) {
      console.log("Error removing from cart: ", error);
    }
  };

  // Calculate subtotal
  const getSubTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Clear storage on logout
  const clearStorage = () => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  // Toggle cart
  const toggleCart = () => {
    setCartIsOpen(prev => !prev);
    if (!cartIsOpen) {
      getCart(); // Refresh cart when opening
    }
  };

  // Toggle mobile navbar
  const toggleNavbar = () => {
    setNavbarIsOpen(prev => !prev);
  };

  // Close navbar when clicking a link
  const closeNavbar = () => {
    setNavbarIsOpen(false);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="flex h-20 bg-black/60 justify-between md:pl-4 z-40">
      <div className="flex">
        <div className="md:flex h-full w-20 hidden items-center">
          <Link href={"/"}>
            <img
              src="https://res.cloudinary.com/drinazvsn/image/upload/v1750169204/WHITE_LOGO_o6cuje.png"
              className="w-full h-full object-cover object-center"
              alt="Website Logo"
            />
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="ml-5 hidden md:flex items-center">
          {["/", "/shop", "/for-him", "/for-her", "/groceries", "/electronics"].map((path, index) => (
            <Link
              key={index}
              className="px-1 py-2 text-gray-50 hover:text-gray-200 font-semibold"
              href={path}
            >
              {path === "/" ? "HOME" : path.slice(1).toUpperCase().replace('-', ' ')}
            </Link>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="flex flex-col md:hidden">
          <button
            onClick={toggleNavbar}
            className="m-6 hover:cursor-pointer"
          >
            <FaBars className="text-white text-2xl" />
          </button>
          
          {navbarIsOpen && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={closeNavbar}>
              <div className="absolute right-0 top-0 h-full w-3/4 bg-white" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-end p-4">
                  <button onClick={closeNavbar} className="p-2">
                    <FaTimes className="text-black text-xl" />
                  </button>
                </div>
                
                <div className="flex flex-col">
                  {[
                    { path: "/", label: "HOME" },
                    { path: "/shop", label: "EVERYTHING" },
                    { path: "/for-him", label: "FOR HIM" },
                    { path: "/for-her", label: "FOR HER" },
                    { path: "/groceries", label: "GROCERIES" },
                    { path: "/electronics", label: "ELECTRONICS" }
                  ].map((item, index) => (
                    <Link
                      key={index}
                      className="p-4 text-black hover:bg-gray-200 font-semibold border-b"
                      href={item.path}
                      onClick={closeNavbar}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* User Auth & Cart Section */}
      <div className="flex items-center pr-4">
        {user ? (
          <div className="flex items-center">
            <button
              className="mx-2 cursor-pointer font-semibold hover:bg-gray-200 bg-gray-300 rounded-lg text-black px-3 py-2"
              onClick={() => { logout(); clearStorage(); }}
            >
              Logout
            </button>
            <Link className="rounded-full w-8 h-8" href={"/profile"}>
              <img
                src={"https://cdn-icons-png.flaticon.com/128/9408/9408175.png"}
                className="rounded-full w-full h-full object-cover"
                alt="Profile"
              />
            </Link>
          </div>
        ) : (
          <div className="flex items-center">
            <Link
              className="mx-2 cursor-pointer hover:bg-gray-200 bg-gray-300 rounded-lg text-black px-3 py-2 font-semibold"
              href={"/auth"}
            >
              Login
            </Link>
          </div>
        )}
        
        {/* Cart */}
        <div className="relative">
          <button
            onClick={toggleCart}
            className="rounded-full relative"
          >
            <FaShoppingCart className="text-white cursor-pointer mx-3 text-3xl" />
            {isClient && totalItems > 0 && (
              <span className="absolute -top-2 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          
          {cartIsOpen && (
            <div className="fixed inset-0 z-50 bg-black/50  " onClick={() => setCartIsOpen(false)}>
              <div 
                className="absolute right-0 top-0 h-full w-full max-w-md bg-white overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h1 className="font-semibold text-lg">
                      You have {cart.length} Items in cart
                    </h1>
                    <button onClick={() => setCartIsOpen(false)} className="p-2">
                      <FaTimes className="text-black text-xl" />
                    </button>
                  </div>
                  
                  <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                    {cart.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">Your cart is empty</p>
                    ) : (
                      cart.map((item, index) => (
                        <div key={index} className="flex justify-between items-start border-b border-gray-300 pb-4">
                          <div className="flex space-x-3">
                            <img 
                              src={item.thumbnail} 
                              alt={item.title}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div>
                              <p className="font-semibold">{item.title}</p>
                              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                              <p className="text-sm text-gray-500">{item.category}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                            <p className="text-sm text-gray-600">${item.price} each</p>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 text-sm hover:text-red-700 mt-1"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  
                  {cart.length > 0 && (
                    <div className="border-t border-gray-300 pt-4 mt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold text-lg">Sub Total:</span>
                        <span className="font-bold text-lg">${getSubTotal().toFixed(2)}</span>
                      </div>
                      <button className="bg-black text-white w-full py-3 rounded-lg hover:bg-gray-800 transition-colors">
                        Check Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;