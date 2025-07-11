import { useEffect } from "react";
import { decryptAESKeyWithRSA, decryptMessageWithAES } from "../utils/crypto";

export const useReceiveMessage = (socket, currentUser, setChat) => {
useEffect(() => {
    if (!currentUser) return;
    socket.on("receive_message", async (data) => {
      if (data.sender === currentUser) return;

      try {
        const privateKey = localStorage.getItem(`${currentUser}_privateKey`);

        if (!privateKey) {
          console.warn("🔐 No private key in localStorage — cannot decrypt");
          return;
        }
        console.log("📩 Incoming socket message:", data);

        const aesKey = await decryptAESKeyWithRSA(
          data.encryptedAESKey,
          privateKey
        );

        const decryptedMsg = await decryptMessageWithAES(
          data.encryptedMessage,
          aesKey,
          data.iv
        );

        if (data.isLocked && data.sender !== currentUser) {
          alert(`One-Time Message:\n\n${decryptedMsg}`);
          return;
        }
        setChat((prev) => [
          ...prev,
          {
            sender: data.sender,
            message: decryptedMsg,
            time: data.time,
            status: "received",
          },
        ]);
console.log(isLocked)
        socket.emit("message_read", {
          sender: data.sender,
          time: data.time,
        });
      } catch (err) {
        console.error("❌ Decryption error:", err);
        setChat((prev) => [
          ...prev,
          { sender: data.sender, message: "[Encrypted]", time: data.time },
        ]);
      }
    });

    return () => socket.off("receive_message");
  }, [currentUser]);
};