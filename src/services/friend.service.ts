import type { FriendDto } from "@/models/Friend.dto";
import http from "@/services/http.client";
import type { Friend } from "@/models/Friend";
import type { User } from "@/models/User";

export class FriendService {
  async create(friend: FriendDto): Promise<Friend> {
    const result = await http.post<Friend>("/friends", friend);
    console.log(result.data);
    return result.data;
  }

  async getAll(user: User): Promise<User[]> {
    const result = await http.get<User[]>("/friends/users" + user.uuid);
    console.log(result.data);
    return result.data;
  }
}
