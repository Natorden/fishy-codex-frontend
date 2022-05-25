import type { User } from "@/models/User";

export interface Chat {
  text: string;
  chatRoom: string;
  fishImage?: string;
  userUUID: string;
  user: User;
}
