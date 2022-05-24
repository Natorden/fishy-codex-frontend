import type { User } from "@/models/User";
import type { LoginDto } from "@/models/Login.dto";
import http from "./http.client";

export class UserService {
  async createUser(
    name: string,
    age: number,
    email: string,
    password: string,
    avatar: string
  ): Promise<User> {
    const result = await http.post<User>("/users/", {
      name: name,
      age: age,
      email: email,
      password: password,
      avatar: avatar,
    });
    return result.data;
  }

  async updateUser(
    id: string,
    name: string,
    age: number,
    email: string,
    password: string,
    avatar: string
  ): Promise<User> {
    const result = await http.patch<User>("/users/" + id, {
      name: name,
      age: age,
      email: email,
      password: password,
      avatar: avatar,
    });
    return result.data;
  }

  async removeUser(id: string) {
    const result = await http.delete<User>("/users/" + id);
    return result.data;
  }

  async logIn(login: LoginDto): Promise<User> {
    const result = await http.post<User>("/login/", login);
    return result.data;
  }

  async getAllUsers(): Promise<User[]> {
    const result = await http.get<User[]>("/users/");
    return result.data;
  }

  async getUserById(id: string): Promise<User> {
    const result = await http.get<User>("/users/" + id);
    return result.data;
  }
}
