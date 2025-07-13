// import MessageInput from "../components/MessageInput";
// import socket from "../socket";

// function ChatWindow({ chat, currentUser }) {
//   return (
//     <div style={{
      
//     padding: "16px",
//     borderRadius: "12px",
//     height: "70vh",
//     overflowY: "auto",
//     backgroundImage: "url('https://t3.ftcdn.net/jpg/03/27/51/56/360_F_327515607_Hcps04aaEc7Ki43d1XZPxwcv0ZaIaorh.jpg')",
//     }}>
//       {chat.map((msg, i) => (
//         <div
//           key={i}
//           style={{
//             alignSelf: (msg.sender === currentUser) ? "flex-end" : "flex-start",
//             backgroundColor: (msg.sender === currentUser) ? "#DCF8C6" : "#E5E5EA",
//             padding: "10px 14px",
//             borderRadius: "20px",
//             maxWidth: "70%",
//             marginBottom: "4px",
//             wordWrap: "break-word",
//             borderBottomRightRadius: 4,
//             boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
//           }}
//         >
//           <b>{msg.sender}</b>
//           <div>{msg.message}</div>
//           <small style={{ fontSize: "10px", color: "#888" }}>
//             {msg.time}{" "}
//             {msg.sender === currentUser && (msg.read ? "✅" : "✔")}
//           </small>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default ChatWindow;


import MessageInput from "../components/MessageInput";
import socket from "../socket";

function ChatWindow({ chat, currentUser }) {
  return (
    <div className="relative p-4 rounded-2xl h-[70vh] overflow-y-auto bg-gray-800 border border-gray-700/50 shadow-2xl">
      {/* Visible chat app pattern background */}
      <div 
        className="absolute inset-0 opacity-40 rounded-2xl"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20px 20px, rgba(139, 92, 246, 0.6) 1px, transparent 1px),
            radial-gradient(circle at 60px 60px, rgba(6, 182, 212, 0.6) 1px, transparent 1px),
            linear-gradient(45deg, rgba(139, 92, 246, 0.05) 25%, transparent 25%, transparent 75%, rgba(139, 92, 246, 0.05) 75%),
            linear-gradient(-45deg, rgba(6, 182, 212, 0.05) 25%, transparent 25%, transparent 75%, rgba(6, 182, 212, 0.05) 75%)
          `,
          backgroundSize: '80px 80px, 80px 80px, 40px 40px, 40px 40px',
          backgroundPosition: '0 0, 40px 40px, 0 0, 20px 20px'
        }}
      ></div>
      
      {/* WhatsApp-style hexagon pattern */}
      <div 
        className="absolute inset-0 opacity-15 rounded-2xl"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              30deg,
              transparent,
              transparent 10px,
              rgba(255, 255, 255, 0.1) 10px,
              rgba(255, 255, 255, 0.1) 11px
            ),
            repeating-linear-gradient(
              -30deg,
              transparent,
              transparent 10px,
              rgba(255, 255, 255, 0.1) 10px,
              rgba(255, 255, 255, 0.1) 11px
            )
          `
        }}
      ></div>
      
      {/* Chat messages container */}
      <div className="relative z-10 flex flex-col space-y-3">
        {chat.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.sender === currentUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`relative max-w-[70%] p-4 rounded-2xl shadow-lg backdrop-blur-sm border transition-all duration-300 hover:shadow-xl ${
                msg.sender === currentUser 
                  ? 'bg-gradient-to-r from-purple-600/90 to-cyan-600/90 text-white border-purple-500/30 ml-auto' 
                  : 'bg-gray-800/90 text-gray-100 border-gray-600/50 mr-auto'
              }`}
              style={{
                borderBottomRightRadius: msg.sender === currentUser ? '4px' : '20px',
                borderBottomLeftRadius: msg.sender === currentUser ? '20px' : '4px',
                wordWrap: "break-word",
              }}
            >
              {/* Subtle glow effect for sent messages */}
              {msg.sender === currentUser && (
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl blur opacity-20 -z-10"></div>
              )}
              
              <div className={`font-semibold text-sm mb-1 ${
                msg.sender === currentUser ? 'text-white/90' : 'text-purple-400'
              }`}>
                {msg.sender}
              </div>
              
              <div className={`mb-2 ${
                msg.sender === currentUser ? 'text-white' : 'text-gray-200'
              }`}>
                {msg.message}
              </div>
              
              <div className={`text-xs flex items-center justify-end space-x-1 ${
                msg.sender === currentUser ? 'text-white/70' : 'text-gray-400'
              }`}>
                <span>{msg.time}</span>
                {msg.sender === currentUser && (
                  <span className="ml-1">
                    {msg.read ? "✅" : "✔"}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Custom scrollbar styling */}
      <style jsx>{`
        div::-webkit-scrollbar {
          width: 6px;
        }
        div::-webkit-scrollbar-track {
          background: rgba(55, 65, 81, 0.3);
          border-radius: 10px;
        }
        div::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8b5cf6, #06b6d4);
          border-radius: 10px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #7c3aed, #0891b2);
        }
      `}</style>
    </div>
  );
}

export default ChatWindow;