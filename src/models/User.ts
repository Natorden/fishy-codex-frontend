import type { Fish } from "@/models/Fish";

export interface User {
  uuid: string;
  name: string;
  age: number;
  email: string;
  password: string;
  avatar: string;
}
