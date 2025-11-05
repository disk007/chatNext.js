type ContentNameProps = {
  roomId: string | null;
  name:string | null;
};

type ContentProps = {
  roomId: string | null;
};

type Message = {
  anotherChat: boolean;
  id: number;
  content: string;
  createdAt: string;
};

type ChatDetail = {
  id: number;
  name: string;
  isGroup: boolean;
  isApproved:boolean
  messages: Message[];
};