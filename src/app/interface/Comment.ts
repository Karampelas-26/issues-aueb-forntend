import {User} from "./User";

export interface Comment {
  content: string,
  dateTime: Date,
  user: User
}
