import Editor from "../component/editor";
import Client from "../component/client";
import { initSocket } from "../socket";
import { useEffect, useRef, useState } from "react";
import { ACTIONS } from "../assets/Actions";
import { useParams } from "react-router-dom"; // Import useParams
import { useUser } from "@clerk/clerk-react"; // Import useUser to get the current user
import toast from "react-hot-toast";
const EditorPage = () => {
  const socketRef = useRef(null);
  const { roomId } = useParams(); // Get roomId from URL parameters dynamically
  const { user } = useUser(); // Use the useUser hook to get the current user info
  // List of connected users (mocked data)
  const [client, setclient] = useState([]);
  useEffect(() => {
    const init = async () => {
      try {
        socketRef.current = await initSocket();
        socketRef.current.on("connect_error", (err) => console.log(err));
        socketRef.current.emit(ACTIONS.JOIN, {
          roomId,
          username: user.fullName || user.emailAddresses[0].emailAddress,
        });
      } catch (error) {
        console.error("Socket initialization failed", error);
      }

      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          if (username !== user.fullName) {
            toast.success(`${username} joined the room`);
            setclient(clients);
          }
        }
      );

      //listing for disconnection

      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left the room`);
        setclient((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });
    };

    if (user) {
      init();
    }

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.off(ACTIONS.JOINED);
        socketRef.current.off(ACTIONS.DISCONNECTED);
      }
    };
  }, [roomId, user]); // This ensures useEffect runs when the roomId or user changes

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-[#252525] w-1/6 min-w-[120px] p-4 flex flex-col items-center gap-6">
        {/* Centered "Connected:" text */}
        <h3 className="text-white text-lg font-semibold w-full text-center border-b border-gray-500 pb-2">
          Connected
        </h3>

        {/* Client List - Side by Side & Wrap on Small Screens */}
        <div className="flex flex-wrap justify-center gap-3">
          {client.map((user) => (
            <Client key={user.id} username={user.username} />
          ))}
        </div>
      </div>

      {/* Main Editor Section */}
      <div className="flex-1">
        {socketRef.current && <Editor socketRef={socketRef} roomId={roomId} />}
      </div>
    </div>
  );
};

export default EditorPage;
