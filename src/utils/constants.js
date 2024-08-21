import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SERVER_URL, {
  withCredentials: true,
});

const socketEvent = {
  SEND_NOTIFICATION: "SEND_NOTIFICATION",
};

export { socket, socketEvent };
