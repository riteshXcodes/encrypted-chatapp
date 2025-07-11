import { io } from "socket.io-client";

const socket = io("https://encrypted-chatapp.onrender.com");
export default socket;