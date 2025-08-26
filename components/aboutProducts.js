"use client"
import React from 'react'

const AboutProducts = () => {
  return (
    <div className='flex flex-col text-gray-800 md:flex-row items-center justify-center gap-5 md:gap-15 py-20 h-auto bg-gray-200'>
      <div className='flex flex-col items-center justify-center gap-2 px-5 text-center'>
        <img src="https://cdn-icons-png.flaticon.com/128/814/814587.png" alt="Shipping" />
        <h2 className='font-semibold text-2xl'>Worldwide Shipping</h2>
        <p className='text-gray-500'>Free shipping on all orders over $100</p>
      </div>
      <div className='flex flex-col items-center justify-center gap-2 px-5 text-center md:px-10 '>
        <img src="https://cdn-icons-png.flaticon.com/128/10770/10770710.png" alt="Quality" />
        <h2 className='font-semibold text-2xl'>Best Quality</h2>
        <p className='text-gray-500'>100% satisfaction guarantee</p>
      </div>
      <div className='flex flex-col items-center justify-center gap-2 px-5 text-center md:px-10 '>
        <img src="https://cdn-icons-png.flaticon.com/128/1611/1611173.png" alt="Shipping" />
        <h2 className='font-semibold text-2xl'>Best Offers</h2>
        <p>Get the best offers</p>
      </div>
      <div className='flex flex-col items-center justify-center gap-2 px-5 text-center md:px-10 '>
        <img src="https://cdn-icons-png.flaticon.com/128/814/814587.png" alt="Shipping" />
        <h2>Secure Payment</h2>
        <p>100% secure payment</p>
      </div>
      
    </div>
  )
}

export default AboutProducts
