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
    console.log(request);
    this.socket.emit("createFriendRequest", request);
  }

  async getFriendRequestByUserId(userId: string): Promise<FriendRequest[]> {
    const result = await http.get<FriendRequest[]>(
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
