// import { useState } from "react";
// import Navbar from "./Navbar.jsx";

// function LoginForm({ setToken, setCurrentUser }) {
//   const [tempUser, setTempUser] = useState("");
//   const [password, setPassword] = useState("");
//   const [isRegistering, setIsRegistering] = useState(false);

//   const handleSubmit = async () => {
//     const endpoint = isRegistering ? "register" : "login";
//     const res = await fetch(`https://encrypted-chatapp.onrender.com/api/auth/${endpoint}`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ username: tempUser, password }),
//     });

//     const data = await res.json();
//     if (data.token) {
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("currentUser", tempUser); 
//       setToken(data.token);
//       setCurrentUser(tempUser);

//       setTimeout(() => {
//   window.location.reload();
// }, 100);
//     } else {
//       alert(data.error || "Something went wrong");
//     }
//   };

//   return (
//     <>
//       <Navbar />
    
//     <div className="p-8 max-w-md mx-auto border border-gray-300 rounded-lg">
      
//       <h2 className="text-lg font-semibold mb-4">{isRegistering ? "Register" : "Login"} to Chat</h2>
//       <input className="border border-gray-300 p-2 mb-4 w-full rounded" placeholder="username" value={tempUser} onChange={(e) => setTempUser(e.target.value)} />
//       <input className="border border-gray-300 p-2 mb-4 w-full rounded" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       <button className="bg-blue-500 text-white p-2 rounded" onClick={handleSubmit}>
//         {isRegistering ? "Register" : "Login"}
//       </button>
//       <p onClick={() => setIsRegistering(!isRegistering)}>
//         {isRegistering ? "Already registered? Login" : "New user? Register"}
//       </p>
//     </div>
//     </>
//   );
// }

// export default LoginForm;


import { useState } from "react";
import Navbar from "./navbar";

function LoginForm({ setToken, setCurrentUser }) {
  const [tempUser, setTempUser] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async () => {
    const endpoint = isRegistering ? "register" : "login";
    const res = await fetch(`https://encrypted-chatapp.onrender.com/api/auth/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: tempUser, password }),
    });

    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("currentUser", tempUser); 
      setToken(data.token);
      setCurrentUser(tempUser);

      setTimeout(() => {
        window.location.reload();
      }, 100);
    } else {
      alert(data.error || "Something went wrong");
    }
  };

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-black flex items-center justify-center p-8 relative">
        {/* Animated background gradient */}
        <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20 animate-pulse -z-10"></div>
        
        {/* Subtle grid pattern overlay */}
        <div className="fixed inset-0 opacity-5 -z-10" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
        
        <div className="relative z-10 w-full max-w-md">
          {/* Glowing border effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl blur opacity-30 animate-pulse"></div>
          
          <div className="relative p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-2xl backdrop-blur-md">
            
            <h2 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {isRegistering ? "Register" : "Login"} to Chat
            </h2>
            
            <div className="space-y-6">
              <div className="relative group">
                <input 
                  className="w-full p-4 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm" 
                  placeholder="Username" 
                  value={tempUser} 
                  onChange={(e) => setTempUser(e.target.value)} 
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              
              <div className="relative group">
                <input 
                  className="w-full p-4 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm" 
                  type="password" 
                  placeholder="Password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl blur opacity-30 group-hover:opacity-70 transition duration-300"></div>
                <button 
                  className="relative w-full p-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 shadow-lg transform hover:scale-105" 
                  onClick={handleSubmit}
                >
                  {isRegistering ? "Register" : "Login"}
                </button>
              </div>
              
              <p 
                className="text-center text-gray-400 cursor-pointer hover:text-white transition-colors duration-300 mt-6 group"
                onClick={() => setIsRegistering(!isRegistering)}
              >
                <span className="relative">
                  {isRegistering ? "Already registered? Login" : "New user? Register"}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;