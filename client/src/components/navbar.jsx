// import React from 'react'

// const Navbar = () => {
//   return (
//     <div className='flex justify-between items-center p-4 bg-gray-800 text-white'>
//      <nav className="flex justify-between items-center w-full max-w-6xl mx-auto">
//         <ul className="flex space-x-15">
//             <li><a href='https://encrypted-chatapp.vercel.app/'>Home</a></li>
//             <li>Features</li>
//             <li>About</li>
//             <li>Contact Us</li>
//         </ul>
//         <ul className="flex space-x-6">
//             <li><div  className="flex items-center px-8 py-3 rounded-full border border-gray-900 bg-[#f9f4ec] text-gray-900 text-lg font-normal hover:bg-gray-100 transition"><a href='https://encrypted-chatapp.vercel.app/login'>Login/Register</a>
//               <span className="ml-2 text-xl">&#8594;</span></div></li>
//         </ul>
//         </nav> 
//     </div>
//   )
// }

// export default Navbar



import React from 'react'

const Navbar = () => {
  return (
    <div className='relative flex justify-between items-center py-3 px-6 bg-black/90 backdrop-blur-md text-white border-b border-gray-800/50'>
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-cyan-900/20 animate-pulse"></div>
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
        backgroundSize: '20px 20px'
      }}></div>
      
      <nav className="relative z-10 flex justify-between items-center w-full max-w-6xl mx-auto">
        <ul className="flex space-x-8">
          <li>
            <a href='/' 
               className="relative text-gray-300 hover:text-white transition-all duration-300 font-medium group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </li>
          <li className="relative text-gray-300 hover:text-white transition-all duration-300 font-medium cursor-pointer group">
            Features
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
          </li>
          <li className="relative text-gray-300 hover:text-white transition-all duration-300 font-medium cursor-pointer group">
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
          </li>
          <li className="relative text-gray-300 hover:text-white transition-all duration-300 font-medium cursor-pointer group">
            Contact Us
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
          </li>
        </ul>
        
        <ul className="flex space-x-6">
          <li>
            <div className="relative group">
              {/* Glowing border effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl blur opacity-30 group-hover:opacity-70 transition duration-300"></div>
              
              <div className="relative flex items-center px-6 py-2 rounded-xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border border-gray-700 text-white text-sm font-medium hover:from-gray-800 hover:via-gray-700 hover:to-gray-800 transition-all duration-300 shadow-2xl">
                <a href='/login' className="flex items-center">
                  <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent font-semibold">
                    Login/Register
                  </span>
                  <span className="ml-3 text-lg transform group-hover:translate-x-1 transition-transform duration-300">
                    &#8594;
                  </span>
                </a>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar