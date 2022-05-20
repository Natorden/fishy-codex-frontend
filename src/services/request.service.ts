import { io } from "socket.io-client";
import http from "./http.client";
import type { FriendRequest } from "@/models/FriendRequest";
import type { FriendRequestTransfer } from "@/models/FriendRequestTransfer";

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

  async getFriendRequestByUserId(
    userId: string
  ): Promise<FriendRequestTransfer[]> {
    const result = await http.get<FriendRequestTransfer[]>(
      "/friend-requests/" + userId
    );
    return result.data;
  }

  async deleteFriendRequestWithRequestUuid(
    requestUuid: string
  ): Promise<FriendRequest> {
    const result = await http.delete<FriendRequest>(
      "/friend-requests/" + requestUuid
    );
    return result.data;
  }
}
