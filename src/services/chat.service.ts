import { io } from "socket.io-client";
import type { Chat } from "@/models/Chat";
import type { ChatRoom } from "@/models/ChatRoom";
import http from "./http.client";
import type { User } from "@/models/User";

export class ChatService {
  socket = io("localhost:3001");

  constructor() {
    this.socket.connect();
  }

  createChat(chat: Chat) {
    this.socket.emit("createChat", chat);
  }

  listenToChatRoom(chatRoom: string, chatListener: (chat: Chat) => void) {
    this.socket.on(chatRoom, (chat: Chat) => chatListener(chat));
  }

  disconnectFromChatRoom(chatRoom: string) {
    this.socket.off(chatRoom);
  }

  async getAllChatRooms(uuid: string): Promise<ChatRoom[]> {
    const result = await http.get<ChatRoom[]>("/chat-rooms/" + uuid);
    return result.data;
  }

  async loadChatRoom(uuid: string): Promise<ChatRoom> {
    const result = await http.get<ChatRoom>("/chat-rooms/" + uuid);
    return result.data;
  }

  async createChatRoom(name: string, userUuid: string): Promise<ChatRoom> {
    const result = await http.post<ChatRoom>("/chat-rooms", { name, userUuid });
    return result.data;
  }

  userIsTyping(chat: Chat) {
    this.socket.emit("isTyping", chat);
  }

  updateIsTyping(continueChat: (date: User[]) => void) {
    return this.socket.on("getIsTyping", (args) => {
      continueChat(args);
    });
  }
}
