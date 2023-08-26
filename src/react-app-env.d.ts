/// <reference types="react-scripts" />

interface IUser {
  _id: string;
  username: string;
  email: string;
  password?: string;
  isAvatarImageSet?: boolean;
  avatarImage: string;
}

interface IMessage {
  _id: string;
  message: string;
  users: IUser[];
  sender: string;
}
