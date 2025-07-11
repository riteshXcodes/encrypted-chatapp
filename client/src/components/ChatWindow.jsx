
import MessageInput from "../components/MessageInput";
import socket from "../socket";

function ChatWindow({ chat, currentUser }) {
  return (
    <div style={{
      
    padding: "16px",
    borderRadius: "12px",
    height: "70vh",
    overflowY: "auto",
    backgroundImage: "url('https://t3.ftcdn.net/jpg/03/27/51/56/360_F_327515607_Hcps04aaEc7Ki43d1XZPxwcv0ZaIaorh.jpg')",
    }}>
      {chat.map((msg, i) => (
        <div
          key={i}
          style={{
            alignSelf: (msg.sender === currentUser) ? "flex-end" : "flex-start",
            backgroundColor: (msg.sender === currentUser) ? "#DCF8C6" : "#E5E5EA",
            padding: "10px 14px",
            borderRadius: "20px",
            maxWidth: "70%",
            marginBottom: "4px",
            wordWrap: "break-word",
            borderBottomRightRadius: 4,
            boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
          }}
        >
          <b>{msg.sender}</b>
          <div>{msg.message}</div>
          <small style={{ fontSize: "10px", color: "#888" }}>
            {msg.time}{" "}
            {msg.sender === currentUser && (msg.read ? "✅" : "✔")}
          </small>
        </div>
      ))}
    </div>
  );
}

export default ChatWindow;
