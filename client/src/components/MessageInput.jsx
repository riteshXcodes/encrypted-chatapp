// import socket from "../socket";
// function MessageInput({ message,
//   setMessage,
//   isLocked,
//   setIsLocked,
//   onSend,
//   currentUser,
//   receiver,
//  }) {
//     return(

// <div className="flex items-center p-2 border-t border-gray-200"
//       >
//         <input className="flex-grow p-2 border border-gray-300 rounded-md mr-2 bg-white"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           onFocus={() => {
//             socket.emit("typing", { sender: currentUser, receiver });
//           }}
//           placeholder="Type a message"
//         />

//         <label className="font-bold text-xl mx-">
//           <input
//             type="checkbox" className="mr-2 size-5"
//             checked={isLocked}
//             onChange={() => setIsLocked(!isLocked)}
//           />{" "}
//           (once view)
//         </label>

//         <button onClick={onSend} className="p-3 bg-blue-500 text-white rounded">
//           Send
//         </button>
//       </div>
//     );
// }

// export default MessageInput;


import socket from "../socket";

function MessageInput({ message,
  setMessage,
  isLocked,
  setIsLocked,
  onSend,
  currentUser,
  receiver,
 }) {
    return(
      <div className="relative flex items-center p-4 border-t border-gray-700/50 bg-gray-900/90 backdrop-blur-md">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-cyan-900/10"></div>
        
        <div className="relative z-10 flex items-center w-full space-x-3">
          {/* Message input with glassmorphism effect */}
          <div className="relative flex-grow group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
            <input 
              className="relative w-full p-3 bg-gray-800/80 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onFocus={() => {
                socket.emit("typing", { sender: currentUser, receiver });
              }}
              placeholder="Type a message..."
            />
          </div>

          {/* Once view checkbox with modern styling */}
          <label className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={isLocked}
                onChange={() => setIsLocked(!isLocked)}
              />
              <div className={`w-5 h-5 rounded border-2 transition-all duration-300 flex items-center justify-center ${
                isLocked 
                  ? 'bg-gradient-to-r from-purple-500 to-cyan-500 border-purple-500' 
                  : 'border-gray-500 group-hover:border-purple-400'
              }`}>
                {isLocked && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-sm font-medium whitespace-nowrap">
              {isLocked ? "🔒 Once view" : "👁️ Once view"}
            </span>
          </label>

          {/* Send button with gradient and glow effect */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl blur opacity-50 group-hover:opacity-100 transition duration-300"></div>
            <button 
              onClick={onSend} 
              className="relative px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 shadow-lg transform hover:scale-105 active:scale-95"
            >
              <span className="flex items-center space-x-2">
                <span>Send</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    );
}

export default MessageInput;