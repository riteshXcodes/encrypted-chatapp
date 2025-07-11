import { useEffect } from "react";
import { decryptAESKeyWithRSA, decryptMessageWithAES } from "../utils/crypto";

export const useFetchChatHistory = (currentUser, receiver, setChat) => {
    useEffect(() => {
    const fetchAndDecryptMessages = async () => {
      if (!currentUser || !receiver) return;

      const res = await fetch(`https://encrypted-chatapp.onrender.com/api/messages?sender=${currentUser}&receiver=${receiver}`);
      const messages = await res.json();
      console.log("💾 Messages fetched from DB:", messages);

      
      const privateKey = localStorage.getItem(`${currentUser}_privateKey`);

      if (!privateKey) {
        alert("Private key missing. Please reload the page.");
        return;
      }

      const decryptedMessages = await Promise.all(
        messages.map(async (msg) => {
          if (!msg.encryptedAESKey || !msg.iv) {
            return {
              sender: msg.sender,
              message: "[Encrypted]",
              time: msg.time,
            };
          }

          try {
            const aesKey = await decryptAESKeyWithRSA(
              msg.encryptedAESKey,
              privateKey
            );
            console.log(" Attempting to decrypt message:", msg);

            const decryptedText = await decryptMessageWithAES(
              msg.message,
              aesKey,
              msg.iv
            );
            return {
              sender: msg.sender,
              message: decryptedText,
              time: msg.time,
            };
          } catch (err) {
            console.error("❌ Decryption failed:", err);
            console.log("⚠️ Message that failed decryption:", msg);

            return {
              sender: msg.sender,
              message: "[Encrypted]",
              time: msg.time,
            };
          }
        })
      );

      setChat(decryptedMessages);
    };


    if(currentUser&&receiver)fetchAndDecryptMessages();
  }, [currentUser, receiver, setChat]);
};