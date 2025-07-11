import { useEffect, useState } from "react";
import { useReceiveMessage } from './hooks/useReceiveMessage';
import { useFetchChatHistory } from './hooks/useFetchChatHistory';
import { useUserSetup } from './hooks/useUserSetup';
import { useChatUIEffects } from './hooks/useChatUIEffects';
import socket from "./socket";
import {
  generateRSAKeyPair,
  exportPrivateKey,
  exportPublicKey,
  generateAESKey,
  encryptMessageWithAES,
  encryptAESKeyWithRSA,
  decryptAESKeyWithRSA,
  decryptMessageWithAES,
} from "./utils/crypto";
import LoginForm from "./components/login";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import ChatPage from "./pages/ChatPage";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("currentUser") || "");
  const [receiver, setReceiver] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUser, setTypingUser] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useChatUIEffects(
    socket,
    currentUser,
    setChat,
    receiver,
    setReceiver,
    setOnlineUsers,
    setTypingUser
  );

  useUserSetup(socket, currentUser, setCurrentUser);

  useFetchChatHistory(currentUser, receiver, setChat);

  useReceiveMessage(socket, currentUser, setChat);

   const sendMessage = async () => {
    if (!message.trim() || !receiver) {
      alert("message or receiver username both required");
      return;
    }

    try {
      const privateKey = localStorage.getItem(`${currentUser}_privateKey`);
      if (!privateKey) {
        console.warn("🔐 No private key in localStorage — cannot decrypt");
        return;
      }

      const aesKey = await generateAESKey();
      const { encrypted, iv } = await encryptMessageWithAES(message, aesKey);

      const response = await fetch(
        `https://encrypted-chatapp.onrender.com/api/auth/get-public-key?username=${receiver}`
      );
      if (!response.ok) {
        alert("Receiver username not found. Please check spelling!");
        return;
      }

      const { publicKey: receiverPublicKey } = await response.json();
      const encryptedAESKey = await encryptAESKeyWithRSA(
        aesKey,
        receiverPublicKey
      );
      console.log("✅ Encrypted AES Key:", encryptedAESKey);
      // below 4-5 lines added to show the encrypted message on screen before encrypting

      setChat((prev) => [
        ...prev,
        {
          sender: currentUser,
          message: message,
          time: new Date().toLocaleTimeString(),
        },
      ]);

      socket.emit("send_message", {
        encryptedMessage: encrypted,
        encryptedAESKey: encryptedAESKey,
        iv,
        sender: currentUser,
        receiver: receiver,
        time: new Date().toLocaleTimeString(),
        isLocked,
      });

      setMessage("");
    } catch (err) {
      console.error("❌ Send error:", err);
    }
  };
  
  return (
    <div>

      <Routes>
        <Route path="https://encrypted-chatapp.vercel.app/" element={<Home />} />

      <Route
        path="/login"
        
        element={token ? <Navigate to="/chat" /> : <LoginForm setToken={setToken} setCurrentUser={setCurrentUser} />}
      />

      <Route
        path="https://encrypted-chatapp.vercel.app/chat"
        element={
          token ? (
            <ChatPage
              message={message}
              setMessage={setMessage}
              isLocked={isLocked}
              setIsLocked={setIsLocked}
              sendMessage={sendMessage}
              currentUser={currentUser}
              receiver={receiver}
              setReceiver={setReceiver}
              onlineUsers={onlineUsers}
              typingUser={typingUser}
              chat={chat}
            />
          ) : (
            <Navigate to="https://encrypted-chatapp.vercel.app/login" />
          )
        }
        
      />
    </Routes>
    </div>
  );
  
}

export default App;
