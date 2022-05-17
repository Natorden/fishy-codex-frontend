import type { User } from "@/models/User";

export interface Chat {
  text: string;
  chatRoom: string;
  userUUID: string;
  user: User;
}
