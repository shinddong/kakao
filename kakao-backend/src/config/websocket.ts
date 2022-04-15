import { Server } from "http";
import { Server as Websocket, Socket, Namespace } from "socket.io";
import { readMessage, receiveMessage } from "../socket/chat.socket";
let websocket: Namespace;

export enum ChatListEvent {
  JOIN_CHANNEL = "joinChannel",
  JOIN_ROOM = "joinRoom",
  SEND_MESSAGE = "sendMessage",
  READ_MESSAGE = "readMessage",
}

export enum ChatEmitEvent {
  RECEIVE_MESSAGE = "receiveMessage",
  UPDATE_ROOM = "updateRoom",
}

export const initializeWebsocket = (server: Server) => {
  //초기화를 위한 함수. 소켓 연결시에 무슨 동작?
  const io = new Websocket(server, {
    cors: {},
  });
  websocket = io.of("/chats");
  websocket.on("connect", (socket: Socket) => {
    //on: 이벤트가 일어날때 connect:연결되었을 때 일어날 일
    console.log("connected");
    socket.on(ChatListEvent.JOIN_ROOM, ({ chatId }) => {
      socket.join(`chat-${chatId}`);
    });
    socket.on(ChatListEvent.SEND_MESSAGE, receiveMessage);
    socket.on(ChatListEvent.READ_MESSAGE, readMessage);
  });

  websocket.on("error", (socket: Socket) => {
    console.log("sfsfs");
  });
};
export const getSocket = () => {
  return websocket;
};
