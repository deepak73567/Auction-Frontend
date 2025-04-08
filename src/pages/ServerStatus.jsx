import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ServerStatus = () => {
  const [serverConnected, setServerConnected] = useState(false);
  
  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const response = await fetch("http://localhost:3000/status"); // Adjust URL as needed
        if (response.ok) {
          setServerConnected(true);
        } else {
          throw new Error("Server not connected");
        }
      } catch (error) {
        setServerConnected(false);
        toast.warn("Please wait while connecting to the server...", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    };

    checkServerStatus();

    // Poll the server every 5 seconds
    const interval = setInterval(checkServerStatus, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {!serverConnected && <h2>Server is down, trying to reconnect...</h2>}
    </div>
  );
};

export default ServerStatus;
