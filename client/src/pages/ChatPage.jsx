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
})
{
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    fetch("https://encrypted-chatapp.onrender.com/api/auth/users")
      .then(res => res.json())
      .then(data => setAllUsers(data.users || []));
  }, []);

  console.log("All Users:", allUsers);
   
  return (
    <div
      className="App"
      style={{
        minHeight: "100vh",
        background: "#e3eafc",
      }}
    >
      {/* Header */}
      <div
        style={{
          width: "100%",
          background: "#f8f9fa",
          padding: "16px 24px 8px 24px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        <h1 className="text-4xl font-bold" style={{ margin: 0 }}>
          🔐 Encrypted Chat
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <p style={{ margin: 0 }}>
            Logged in as: <b>{currentUser}</b>
          </p>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("currentUser");
  localStorage.removeItem("selectedReceiver");
                // localStorage.removeItem(`${currentUser}_privateKey`);
              window.location.reload();
            }}
            style={{
              backgroundColor: "#e74c3c",
              color: "white",
              border: "none",
              borderRadius: "4px",
              padding: "6px 10px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          display: "flex",
          height: "calc(100vh - 110px)",
        }}
      >
        {/* Left: Online Users */}
        <div
          style={{
            width: "30%",
            borderRight: "1px solid #ccc",
            padding: "24px 16px",
            boxSizing: "border-box",
            backgroundImage:
              "url('https://t4.ftcdn.net/jpg/01/06/84/75/360_F_106847582_7JcRyHVy0xsp9qIDvuccmdl5oz3jorbm.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h2 className="text-2xl font-bold">🟢 Online Users:</h2>
          {onlineUsers.length === 0 ? (
            <p className="text-gray-500">No one online</p>
          ) : (
            <ul className="list-disc pl-5">
              {onlineUsers.map((u, i) => (
                <li key={i}>{u}</li>
              ))}
            </ul>
          )}
          <h2 className="text-2xl font-bold mb-2">All Users:</h2>
<ul className="mb-4">
    {allUsers
      .filter(u => u !== currentUser)
      .map((u, i) => (
        <li
          key={i}
        className={`cursor-pointer px-3 py-1 rounded mb-1 ${
          receiver === u
            ? "bg-blue-500 text-white"
            : onlineUsers.includes(u)
            ? "bg-green-100 text-green-800"
            : "bg-gray-100 text-gray-800"
        }`}
        onClick={() => setReceiver(u)}
      >
        {u}
        {onlineUsers.includes(u) && <span className="ml-2">🟢</span>}
        {receiver === u && <span className="ml-2 font-bold">(Selected)</span>}
      </li>
    ))}
</ul>
          {typingUser && (
            <p>
              <i>{typingUser} is typing...</i>
            </p>
          )}
        </div>

        
        <div style={{ width: "70%", padding: "24px", boxSizing: "border-box" }}>
          <ChatWindow chat={chat} currentUser={currentUser} />
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
  );
   }

export default ChatPage;