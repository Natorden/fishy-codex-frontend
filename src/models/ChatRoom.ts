import type { Chat } from "@/models/Chat";

export interface ChatRoom {
  uuid: string;
  name: string;
  chats: Chat[];
}
