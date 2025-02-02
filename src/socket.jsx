import { io } from "socket.io-client";

export const initSocket = async () => {
  const options = {
    forceNew: true, // Fixed key name
    reconnectionAttempts: Infinity, // Fixed key name
    timeout: 10000,
    transports: ["websocket"],
  };

  // Make sure the environment variable is correctly set in the .env file
  const backendUrl =
    import.meta.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

  if (!backendUrl) {
    console.error("Backend URL is not defined in the environment variables.");
    return;
  }

  // Ensure the backend URL is valid (e.g., ws://localhost:5000 or wss://...)
  return io(backendUrl, options);
};
