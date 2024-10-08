import io from "socket.io-client";

const socket = io("https://sahaya-api.vercel.app", {
  withCredentials: true, // Include credentials such as cookies and authorization headers
  methods: ["GET", "POST","PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

export default socket;

