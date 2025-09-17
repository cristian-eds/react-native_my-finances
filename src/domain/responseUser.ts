import { User } from "./userModel";

export interface ResponseUser {
    data: Omit<User,"password"> | null;
    error?: string;
}