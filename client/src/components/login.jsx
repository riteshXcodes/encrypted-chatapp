import { useState } from "react";
import Navbar from "./navbar.jsx";

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
    
    <div className="p-8 max-w-md mx-auto border border-gray-300 rounded-lg">
      
      <h2 className="text-lg font-semibold mb-4">{isRegistering ? "Register" : "Login"} to Chat</h2>
      <input className="border border-gray-300 p-2 mb-4 w-full rounded" placeholder="username" value={tempUser} onChange={(e) => setTempUser(e.target.value)} />
      <input className="border border-gray-300 p-2 mb-4 w-full rounded" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="bg-blue-500 text-white p-2 rounded" onClick={handleSubmit}>
        {isRegistering ? "Register" : "Login"}
      </button>
      <p onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? "Already registered? Login" : "New user? Register"}
      </p>
    </div>
    </>
  );
}

export default LoginForm;