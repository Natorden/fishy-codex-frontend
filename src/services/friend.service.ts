import type { FriendDto } from "@/models/Friend.dto";
import http from "@/services/http.client";
import type { Friend } from "@/models/Friend";
import type { User } from "@/models/User";

export class FriendService {
  async create(friend: FriendDto): Promise<Friend> {
    const result = await http.post<Friend>("/friends", friend);
    return result.data;
  }

  async getAllById(user: User): Promise<User[]> {
    const result = await http.get<User[]>("/friends/users" + user.uuid);
    return result.data;
  }

  async getAll(): Promise<Friend[]> {
    const result = await http.get<Friend[]>("/friends");
    return result.data;
  }

  async remove(friend: Friend) {
    await http.delete<Friend>("/friends/" + friend.uuid);
  }
}
