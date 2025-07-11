import { useEffect } from "react";
import {
  generateRSAKeyPair,
  exportPrivateKey,
  exportPublicKey,
} from "../utils/crypto"; 

export const useUserSetup = (socket, currentUser, setCurrentUser) => {
     useEffect(() => {
    if (!currentUser) return;

    socket.emit("register_user", currentUser); // ✅ After prompt/login
    setCurrentUser(currentUser);

    const setup = async () => {
      // localStorage.removeItem(`${user}_privateKey`);
      const existingPrivateKey = localStorage.getItem(`${currentUser}_privateKey`);
      if (!existingPrivateKey) {
        const keyPair = await generateRSAKeyPair();
        const privateKey = await exportPrivateKey(keyPair.privateKey);
        const publicKey = await exportPublicKey(keyPair.publicKey);

        localStorage.setItem(`${currentUser}_privateKey`, privateKey);

        await fetch("http://localhost:5000/api/auth/save-public-key", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: currentUser, publicKey }),
        });
      }
    };

    setup();
  }, []);
};