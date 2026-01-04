export interface ContentNameProps {
  roomId: string | null;
  name:string | null;
};

export interface ContentProps {
  roomId: string | null;
};

export interface Message {
  id: number;
  content: string;
  createdAt: string;
  senderId: number;
  files: file[];
};

export interface file {
  id: number;
  originalName: string;
  storedName: string;
}

export interface ChatDetail {
  id: number;
  name: string;
  isGroup: boolean;
  isApproved:boolean
  messages: Message[];
};