import { Mascota } from "./mascotaTypes";
import { ChatHistory } from "./mascotaTypes";

export interface User {
  id: bigint;
  clerkId: string;
  name: string;
  email: string;
  imageUrl?: string;
  pets?: Mascota[];
  chatHistory?: ChatHistory[];
}