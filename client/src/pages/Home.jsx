// import { Link } from "react-router-dom";
// import Navbar from "../components/navbar";

// function Home() {
//   return (
//     <>
//       <Navbar />

//       <div className="flex items-center justify-center min-h-screen bg-[#f9f4ec] bg-gradient-to-r from-[#f9f4ec] to-[#e0d5c8] vh-100 mb-0">
//         <div className="w-2/5 flex justify-center items-center">
//           <img className="h-auto w-3/5 rounded-xl shadow-lg"
//             src="https://videos.openai.com/vg-assets/assets%2Ftask_01jzs6wtmcetpbv16m149cyg3c%2F1752119180_img_0.webp?st=2025-07-10T03%3A05%3A03Z&se=2025-07-16T04%3A05%3A03Z&sks=b&skt=2025-07-10T03%3A05%3A03Z&ske=2025-07-16T04%3A05%3A03Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=8ebb0df1-a278-4e2e-9c20-f2d373479b3a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=94bAv3L5hB10M74x0Wk99Schfk1QPqtsus%2Bc%2Bi4eb3E%3D&az=oaivgprodscus"
//             alt="Chat Illustration"
//           />
//         </div>
      
//       <div className="w-3/5 flex flex-col items-center justify-center">
//       <img className="w-24 h-24" src="https://cdn-icons-png.flaticon.com/512/6995/6995660.png"></img>
//           <h1 className="text-4xl font-bold mb-4">Welcome to Encrypted Chat 🔐</h1>
//           <p className="mb-8 text-lg text-center">
//             A privacy-first chat application with RSA + AES encryption.
//           </p>
//           <div className="flex space-x-4">
//             <Link to="/login" className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition">
//               Login/Register
//             </Link>
//           </div>
//         </div>
//         </div>

//     </>
//   );
// }

// export default Home;



import { useState, useEffect } from "react";
import Navbar from "../components/navbar";

function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [floatingElements, setFloatingElements] = useState([]);

  useEffect(() => {
    setIsLoaded(true);
    
    // Create floating security elements
    const elements = [];
    for (let i = 0; i < 8; i++) {
      elements.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2,
      });
    }
    setFloatingElements(elements);
  }, []);

  return (
    <>
      <Navbar className="fixed top-0 left-0 right-0 z-50 h-16 bg-gray-900/80 backdrop-blur-md border-b border-gray-700" />

      <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 vh-100 mb-0 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          {floatingElements.map((elem) => (
            <div
              key={elem.id}
              className="absolute w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse"
              style={{
                left: `${elem.x}%`,
                top: `${elem.y}%`,
                animationDelay: `${elem.delay}s`,
                animationDuration: `${elem.duration}s`,
              }}
            />
          ))}
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-gray-600 to-gray-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-20 w-72 h-72 bg-gradient-to-r from-gray-500 to-gray-700 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />

        {/* Main Content */}
        <div className={`w-3/5 flex flex-col justify-center pl-16 transition-all duration-1000 ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
          <div className="relative group mb-6">
            <div className="absolute -inset-2 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 rounded-full blur-lg opacity-60 group-hover:opacity-80 animate-pulse" />
            <img 
              className="relative w-16 h-16 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 animate-bounce" 
              src="https://cdn-icons-png.flaticon.com/512/6995/6995660.png"
              alt="Security Icon"
            />
          </div>
          
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-gray-100 via-white to-gray-300 bg-clip-text text-transparent animate-gradient-x leading-tight">
            Encrypted ChatApp🔐
          </h1>
          
          <p className="mb-8 text-xl text-gray-300 max-w-2xl leading-relaxed transform transition-all duration-700 delay-500 hover:text-white">
            A privacy-first chat application with RSA + AES encryption. Secure messaging with end-to-end encryption for your peace of mind.
          </p>
          
          <div className="flex space-x-4">
            <button 
              onClick={() => window.location.href = "https://encrypted-chatapp.vercel.app/login"}
              className="group relative px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-gray-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 active:scale-95"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-gray-500 to-gray-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center space-x-2">
                <span>Get Started</span>
                <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </button>
          </div>
        </div>
      
        {/* Chat Demo */}
        <div className={`w-2/5 flex justify-center items-center pr-16 transition-all duration-1000 delay-300 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
          <div className="relative group w-full max-w-md">
            <div className="absolute -inset-1 bg-gradient-to-r from-gray-600 to-gray-400 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 animate-tilt" />
            <div className="relative bg-gray-800 rounded-xl shadow-2xl p-6 border border-gray-700 transform transition-all duration-500 group-hover:scale-105">
              {/* Chat Header */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">🔒</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Secure Chat</h3>
                    <p className="text-gray-400 text-sm">End-to-end encrypted</p>
                  </div>
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              </div>
              
              {/* Chat Messages */}
              <div className="space-y-3 mb-4">
                <div className="flex justify-end">
                  <div className="bg-gray-600 text-white px-4 py-2 rounded-2xl rounded-tr-sm max-w-xs">
                    <p className="text-sm">Hey! How secure is this chat?</p>
                    <span className="text-xs text-gray-300">🔐 Encrypted</span>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-gray-700 text-white px-4 py-2 rounded-2xl rounded-tl-sm max-w-xs">
                    <p className="text-sm">Very secure! RSA + AES encryption protects all messages</p>
                    <span className="text-xs text-gray-300">🔐 Encrypted</span>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-gray-600 text-white px-4 py-2 rounded-2xl rounded-tr-sm max-w-xs">
                    <p className="text-sm">Perfect! Privacy first 🛡️</p>
                    <span className="text-xs text-gray-300">🔐 Encrypted</span>
                  </div>
                </div>
              </div>
              
              {/* Chat Input */}
              <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-gray-700">
                <div className="flex-1 bg-gray-900 rounded-full px-4 py-2 border border-gray-600">
                  <input 
                    type="text" 
                    placeholder="Type your encrypted message..."
                    className="w-full bg-transparent text-white placeholder-gray-400 outline-none text-sm"
                    disabled
                  />
                </div>
                <button className="bg-gray-600 hover:bg-gray-500 text-white p-2 rounded-full transition-colors">
                  <span className="text-sm">🔒</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }
        
        @keyframes tilt {
          0%, 50%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(1deg); }
          75% { transform: rotate(-1deg); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-tilt {
          animation: tilt 10s infinite linear;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </>
  );
}

export default Home;