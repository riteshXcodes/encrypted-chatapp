import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center p-4 bg-gray-800 text-white'>
     <nav className="flex justify-between items-center w-full max-w-6xl mx-auto">
        <ul className="flex space-x-15">
            <li><a href='https://encrypted-chatapp.vercel.app/'>Home</a></li>
            <li>Features</li>
            <li>About</li>
            <li>Contact Us</li>
        </ul>
        <ul className="flex space-x-6">
            <li><div  className="flex items-center px-8 py-3 rounded-full border border-gray-900 bg-[#f9f4ec] text-gray-900 text-lg font-normal hover:bg-gray-100 transition"><a href='https://encrypted-chatapp.vercel.app/login'>Login/Register</a>
              <span className="ml-2 text-xl">&#8594;</span></div></li>
        </ul>
        </nav> 
    </div>
  )
}

export default Navbar
