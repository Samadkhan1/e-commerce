import React from 'react'

const Loader = () => {
  return (
    <div>
        <div className="flex items-center justify-center">
          <div
            className="loader border-t-2 rounded-full border-gray-500 bg-gray-300 animate-spin
aspect-square w-12 flex justify-center items-center text-yellow-700"
          ></div>
        </div>
    </div>
  )
}

export default Loader
