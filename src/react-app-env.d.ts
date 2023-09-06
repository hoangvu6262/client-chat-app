/// <reference types="react-scripts" />

interface IUser {
  _id?: string;
  username: string;
  userId: string;
  email: string;
  password?: string;
  isAvatarImageSet?: boolean;
  avatarImage: string;

  createdAt?: string;
  updatedAt?: string;
}

interface IMessage {
  _id: string;
  message: string;
  users: IUser[];
  sender: string;
  fileUrl: string;

  channelId: string;
  channel: IChannel;

  createdAt: string;
  updatedAt: string;
}

interface IServer {
  _id: string;
  name: string;
  imageUrl: string;
  inviteCode?: string;

  userId: String;

  members: IMember[];
  channels: IChannel[];

  createdAt: string;
  updatedAt: string;
}

interface IMember {
  _id: string;
  role: string;

  userId: String;

  serverId: string;

  messages: IMessage[];
  directMessages: IDirectMessage[];

  conversationsInitiated: IConversation[];
  conversationsReceived: IConversation[];

  createdAt: string;
  updatedAt: string;
}

interface IChannel {
  _id?: string;
  name: string;
  type: string;

  userId: String;

  serverId: string;

  messages?: IMessage[];

  createdAt?: string;
  updatedAt?: string;
}

interface IConversation {
  _id: string;
  memberOneId: string;
  memberOne: IMember;

  memberTwoId: string;
  memberTwo: IMember;

  directMessages: IDirectMessage[];
}

interface IDirectMessage {
  _id: string;
  content: string;
  fileUrl: string;

  memberId: string;
  member: IMember;

  conversationId: string;
  conversation: IConversation;

  createdAt: string;
  updatedAt: string;
}

type ChannelType = "text" | "audio" | "video";

type ModalType = "channel" | "sever" | "invite";
