import React, { createContext } from "react";
import { useDispatch } from "react-redux";

const WebSocketContext = createContext(null);

const WebSocketProvider = ({ children }) => {
  let socket;
  let ws;

  const dispatch = useDispatch();

  const sendMessage = (payload) => {
    socket.send(JSON.stringify(payload));
    dispatch(payload);
  };

  if (!socket) {
    socket = new WebSocket("ws://psepsis.herokuapp.com/k_comm");
    socket.onmessage = function (event) {
      console.log("WebSocket message received:", event.data);
    };

    ws = {
      socket: socket,
      sendMessage,
    };
  }

  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  );
};

export { WebSocketContext, WebSocketProvider };
