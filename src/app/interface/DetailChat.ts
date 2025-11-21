export interface ContentNameProps {
  roomId: string | null;
  name:string | null;
};

export interface ContentProps {
  roomId: string | null;
};

export interface Message {
  anotherChat: boolean;
  id: number;
  content: string;
  createdAt: string;
};

export interface ChatDetail {
  id: number;
  name: string;
  isGroup: boolean;
  isApproved:boolean
  messages: Message[];
};