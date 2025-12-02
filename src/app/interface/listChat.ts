export interface userIdProps {
  roomId?: string | null;
}
interface Sender {
  id: number;
  username: string;
}

interface Message {
  id: number;
  content: string;
  createdAt: string;
  sender: Sender;
}

export interface ListChat {
  id: number;
  name: string;
  createdAt: string;
  messages: Message[];
  unreadCount: number;
}
