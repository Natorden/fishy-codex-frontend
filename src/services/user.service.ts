import type { User } from "@/models/User";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as http from "http";
import type { LoginDto } from "@/models/Login.dto";

export class UserService {
  async createUser(
    name: string,
    age: number,
    email: string,
    password: string
  ): Promise<User> {
    const result = await http.post<User>("/users", {
      name: name,
      age: age,
      email: email,
      password: password,
    });
    return result.data;
  }

  async logIn(login: LoginDto): Promise<User> {
    const result = await http.post<User>("/login", login);
    return result.data;
  }

  async getAllUsers(): Promise<User[]> {
    const result = await http.get<User[]>("/users");
    return result.data;
  }

  async getUserById(id: string): Promise<User> {
    const result = await http.get<User>("/users/" + id);
    return result.data;
  }
}
