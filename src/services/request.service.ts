import { io } from "socket.io-client";
import http from "./http.client";
import type { FriendRequest } from "@/models/FriendRequest";

export class RequestService {
  socket = io("localhost:3001");

  constructor() {
    this.socket.connect();
  }

  sendFriendRequest(senderUserId: string, receiverUserId: string) {
    const request: FriendRequest = {
      senderUserId: senderUserId,
      receiverUserId: receiverUserId,
    };
    this.socket.emit("createFriendRequest", request);
  }

  async getFriendRequestByUserId(userId: string): Promise<FriendRequest[]> {
    const result = await http.get<FriendRequest[]>(
      "/friend-requests/" + userId
    );
    return result.data;
  }
}
