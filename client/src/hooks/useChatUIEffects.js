import { useEffect } from "react";

export const useChatUIEffects = (
  socket,
  currentUser,
  setChat,
  receiver,
  setReceiver,
  setOnlineUsers,
  setTypingUser
) => {

      useEffect(() => {
        socket.on("mark_as_read", (time) => {
          setChat((prev) =>
            prev.map((msg) => (msg.time === time ? { ...msg, read: true } : msg))
          );
        });
    
        return () => socket.off("mark_as_read");
      }, [socket, setChat]);
    
      useEffect(() => {
      const saved = localStorage.getItem("selectedReceiver");
      if (saved) setReceiver(saved);
    }, [setReceiver]);
    
    useEffect(() => {
      if (receiver) {
        localStorage.setItem("selectedReceiver", receiver);
      }
    }, [receiver]);
    
    
      useEffect(() => {
        socket.on("online_users", (users) => {
          setOnlineUsers(users.filter((u) => u !== currentUser));
        });
    
        return () => socket.off("online_users");
      }, [socket, currentUser, setOnlineUsers]);
    
      useEffect(() => {
        socket.on("show_typing", (sender) => {
          setTypingUser(sender);
          setTimeout(() => setTypingUser(""), 2000);
        });
    
        return () => socket.off("show_typing");
      }, [socket, setTypingUser]);
    };