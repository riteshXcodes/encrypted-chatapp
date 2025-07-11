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

<div className="flex items-center p-2 border-t border-gray-200"
      >
        <input className="flex-grow p-2 border border-gray-300 rounded-md mr-2 bg-white"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onFocus={() => {
            socket.emit("typing", { sender: currentUser, receiver });
          }}
          placeholder="Type a message"
        />

        <label className="font-bold text-xl mx-">
          <input
            type="checkbox" className="mr-2 size-5"
            checked={isLocked}
            onChange={() => setIsLocked(!isLocked)}
          />{" "}
          (once view)
        </label>

        <button onClick={onSend} className="p-3 bg-blue-500 text-white rounded">
          Send
        </button>
      </div>
    );
}

export default MessageInput;