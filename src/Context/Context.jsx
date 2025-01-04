import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
const contextData = createContext(null);

export const useSocket = () => useContext(contextData);
const Context = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (socket) {
      return;
    }
    const socketConnect = io(`https://api.sellaze.com`);
    setSocket(socketConnect);

    function onConnect() {
      console.log(socketConnect.id);
    }

    function onDisconnect() {
      setSocket(null);
    }

    socketConnect.on("connect", onConnect);
    socketConnect.on("disconnect", onDisconnect);

    return () => {
      socketConnect.off("connect", onConnect);
      socketConnect.off("disconnect", onDisconnect);
    };
  }, [localStorage.getItem("token")]);
  const values = { socket };
  return <contextData.Provider value={values}>{children}</contextData.Provider>;
};

export default Context;
