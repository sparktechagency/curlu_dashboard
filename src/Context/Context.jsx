import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useGetProfileQuery } from "../Redux/Apis/authApis";
const contextData = createContext(null);

export const useSocket = () => useContext(contextData);
const Context = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { data: profile } = useGetProfileQuery();
  useEffect(() => {
    if (!profile?.user?.id) {
      return;
    }
    if (socket) {
      return;
    }
    const socketConnect = io(
      `http://182.252.68.227:3000?userId=${profile?.user?.id}`
    );
    setSocket(socketConnect);

    function onConnect() {

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
  }, [localStorage.getItem("token"), profile]);

  const values = { socket };
  return <contextData.Provider value={values}>{children}</contextData.Provider>;
};

export default Context;
