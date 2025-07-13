// import { useEffect, useState } from "react";
// import ChatWindow from "../components/ChatWindow";
// import MessageInput from "../components/MessageInput";
// import socket from "../socket";

// function ChatPage({
//   message,
//   setMessage,
//   isLocked,
//   setIsLocked,
//   sendMessage,
//   currentUser,
//   receiver,
//   setReceiver,
//   onlineUsers,
//   typingUser,
//   chat,
// })
// {
//   const [allUsers, setAllUsers] = useState([]);

//   useEffect(() => {
//     fetch("https://encrypted-chatapp.onrender.com/api/auth/users")
//       .then(res => res.json())
//       .then(data => setAllUsers(data.users || []));
//   }, []);

//   console.log("All Users:", allUsers);
   
//   return (
//     <div
//       className="App"
//       style={{
//         minHeight: "100vh",
//         background: "#e3eafc",
//       }}
//     >
//       {/* Header */}
//       <div
//         style={{
//           width: "100%",
//           background: "#f8f9fa",
//           padding: "16px 24px 8px 24px",
//           display: "flex",
//           flexDirection: "row",
//           alignItems: "center",
//           justifyContent: "space-between",
//           boxSizing: "border-box",
//         }}
//       >
//         <h1 className="text-4xl font-bold" style={{ margin: 0 }}>
//           🔐 Encrypted Chat
//         </h1>
//         <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
//           <p style={{ margin: 0 }}>
//             Logged in as: <b>{currentUser}</b>
//           </p>
//           <button
//             onClick={() => {
//               localStorage.removeItem("token");
//               localStorage.removeItem("currentUser");
//   localStorage.removeItem("selectedReceiver");
//                 // localStorage.removeItem(`${currentUser}_privateKey`);
//               window.location.reload();
//             }}
//             style={{
//               backgroundColor: "#e74c3c",
//               color: "white",
//               border: "none",
//               borderRadius: "4px",
//               padding: "6px 10px",
//               cursor: "pointer",
//             }}
//           >
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* Body */}
//       <div
//         style={{
//           display: "flex",
//           height: "calc(100vh - 110px)",
//         }}
//       >
//         {/* Left: Online Users */}
//         <div
//           style={{
//             width: "30%",
//             borderRight: "1px solid #ccc",
//             padding: "24px 16px",
//             boxSizing: "border-box",
//             backgroundImage:
//               "url('https://t4.ftcdn.net/jpg/01/06/84/75/360_F_106847582_7JcRyHVy0xsp9qIDvuccmdl5oz3jorbm.jpg')",
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         >
//           <h2 className="text-2xl font-bold">🟢 Online Users:</h2>
//           {onlineUsers.length === 0 ? (
//             <p className="text-gray-500">No one online</p>
//           ) : (
//             <ul className="list-disc pl-5">
//               {onlineUsers.map((u, i) => (
//                 <li key={i}>{u}</li>
//               ))}
//             </ul>
//           )}
//           <h2 className="text-2xl font-bold mb-2">All Users:</h2>
// <ul className="mb-4">
//     {allUsers
//       .filter(u => u !== currentUser)
//       .map((u, i) => (
//         <li
//           key={i}
//         className={`cursor-pointer px-3 py-1 rounded mb-1 ${
//           receiver === u
//             ? "bg-blue-500 text-white"
//             : onlineUsers.includes(u)
//             ? "bg-green-100 text-green-800"
//             : "bg-gray-100 text-gray-800"
//         }`}
//         onClick={() => setReceiver(u)}
//       >
//         {u}
//         {onlineUsers.includes(u) && <span className="ml-2">🟢</span>}
//         {receiver === u && <span className="ml-2 font-bold">(Selected)</span>}
//       </li>
//     ))}
// </ul>
//           {typingUser && (
//             <p>
//               <i>{typingUser} is typing...</i>
//             </p>
//           )}
//         </div>

        
//         <div style={{ width: "70%", padding: "24px", boxSizing: "border-box" }}>
//           <ChatWindow chat={chat} currentUser={currentUser} />
//           <MessageInput
//             message={message}
//             setMessage={setMessage}
//             isLocked={isLocked}
//             setIsLocked={setIsLocked}
//             onSend={sendMessage}
//             currentUser={currentUser}
//             receiver={receiver}
//           />
//         </div>
//       </div>
//     </div>
//   );
//    }

// export default ChatPage;

import { useEffect, useState } from "react";
import ChatWindow from "../components/ChatWindow";
import MessageInput from "../components/MessageInput";
import socket from "../socket";


function ChatPage({
  message,
  setMessage,
  isLocked,
  setIsLocked,
  sendMessage,
  currentUser,
  receiver,
  setReceiver,
  onlineUsers,
  typingUser,
  chat,
}) {
  const [allUsers, setAllUsers] = useState([]);

 

  useEffect(() => {
    fetch("https://encrypted-chatapp.onrender.com/api/auth/users")
      .then(res => res.json())
      .then(data => setAllUsers(data.users || []));
  }, []);

  console.log("All Users:", allUsers);
   
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Compact Dark Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 via-purple-600/20 to-pink-600/20 animate-pulse"></div>
        
        <div className="relative backdrop-blur-xl bg-white/5 border-b border-white/10 shadow-2xl">
          <div className="max-w-7xl mx-auto px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-xl shadow-lg">
                    <span className="text-xl">🔐</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900 animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Encrypted Chat
                  </h1>
                  <p className="text-gray-400 text-xs">End-to-end encrypted messaging</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-gray-400 text-xs">Logged in as</p>
                  <p className="text-white font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    {currentUser}
                  </p>
                </div>
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("currentUser");
                    localStorage.removeItem("selectedReceiver");
                    window.location.reload();
                  }}
                  className="group relative bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
                >
                  <span className="relative z-10">Logout</span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-100px)] max-w-7xl mx-auto gap-6 p-6">
        {/* Left Sidebar - Users */}
        <div className="w-80 flex-shrink-0 flex flex-col h-full">
          <div className="bg-gradient-to-b from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 flex flex-col h-full">
            {/* Online Users Section - Fixed Height */}
            <div className="flex-shrink-0 p-4 border-b border-gray-700/50">
              <div className="flex items-center space-x-3 mb-3">
                <div className="relative">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                </div>
                <h2 className="text-lg font-bold text-white">Online</h2>
                <div className="bg-green-500/20 px-2 py-1 rounded-full">
                  <span className="text-green-400 text-xs font-bold">{onlineUsers.length}</span>
                </div>
              </div>
              
              {onlineUsers.length === 0 ? (
                <div className="text-center py-3">
                  <div className="w-10 h-10 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-lg opacity-50">😴</span>
                  </div>
                  <p className="text-gray-400 text-sm">No one online</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-24 overflow-y-auto">
                  {onlineUsers.map((u, i) => (
                    <div key={i} className="flex items-center space-x-2 p-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20">
                      <div className="relative">
                        <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                          {u.charAt(0).toUpperCase()}
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-full border border-gray-900"></div>
                      </div>
                      <span className="text-green-300 font-medium text-sm">{u}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* All Users Section - Scrollable */}
            <div className="flex-1 flex flex-col min-h-0">
              <div className="flex-shrink-0 p-4 pb-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white">All Users</h2>
                  <div className="bg-purple-500/20 px-2 py-1 rounded-full">
                    <span className="text-purple-400 text-xs font-bold">
                      {allUsers.filter(u => u !== currentUser).length}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Fixed Scrollable Users List */}
              <div className="flex-1 overflow-y-auto px-4 pb-4">
                <div className="space-y-2">
                  {allUsers
                    .filter(u => u !== currentUser)
                    .map((u, i) => (
                      <div
                        key={i}
                        className={`group relative p-3 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
                          receiver === u
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25"
                            : onlineUsers.includes(u)
                            ? "bg-gradient-to-r from-green-600/20 to-emerald-600/20 text-green-300 hover:from-green-600/30 hover:to-emerald-600/30 border border-green-500/20"
                            : "bg-gradient-to-r from-gray-700/50 to-gray-600/50 text-gray-300 hover:from-gray-600/50 hover:to-gray-500/50 border border-gray-600/20"
                        }`}
                        onClick={() => setReceiver(u)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="relative">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm ${
                                receiver === u
                                  ? "bg-white/20"
                                  : onlineUsers.includes(u)
                                  ? "bg-gradient-to-r from-green-500 to-emerald-500"
                                  : "bg-gradient-to-r from-gray-600 to-gray-500"
                              }`}>
                                {u.charAt(0).toUpperCase()}
                              </div>
                              {onlineUsers.includes(u) && (
                                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900 animate-pulse"></div>
                              )}
                            </div>
                            <div>
                              <span className="font-bold">{u}</span>
                              <p className="text-xs opacity-70">
                                {onlineUsers.includes(u) ? "Online" : "Offline"}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {receiver === u && (
                              <div className="bg-white/20 px-2 py-1 rounded-full">
                                <span className="text-xs font-bold">ACTIVE</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              
              {/* Typing Indicator - Fixed at bottom */}
              {typingUser && (
                <div className="flex-shrink-0 p-3 mx-4 mb-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl border border-blue-500/20">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="text-blue-300 font-medium text-sm">
                      {typingUser} is typing...
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side - Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="bg-gradient-to-b from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 h-full flex flex-col overflow-hidden">
            {/* Chat Header */}
            <div className="flex-shrink-0 p-4 border-b border-gray-700/50 bg-gradient-to-r from-gray-800/50 to-gray-700/50">
              <div className="flex items-center space-x-3">
                {receiver ? (
                  <>
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {receiver.charAt(0).toUpperCase()}
                      </div>
                      {onlineUsers.includes(receiver) && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900 animate-pulse"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{receiver}</h3>
                      <p className={`text-xs font-medium ${
                        onlineUsers.includes(receiver) ? "text-green-400" : "text-gray-400"
                      }`}>
                        {onlineUsers.includes(receiver) ? "🟢 Online" : "⚫ Offline"}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="text-center w-full py-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-3xl opacity-50">💬</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">Start a Conversation</h3>
                    <p className="text-gray-400 text-sm">Select a user from the sidebar to begin chatting</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Chat Window */}
            <div className="flex-1 overflow-hidden">
              <ChatWindow chat={chat} currentUser={currentUser} />
            </div>
            
            {/* Message Input */}
            <div className="border-t border-gray-700/50 bg-gray-800/30">
              <MessageInput
                message={message}
                setMessage={setMessage}
                isLocked={isLocked}
                setIsLocked={setIsLocked}
                onSend={sendMessage}
                currentUser={currentUser}
                receiver={receiver}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;