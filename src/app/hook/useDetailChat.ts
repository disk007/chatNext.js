import { useEffect, useState } from "react";
import { GetDetailChat } from "../api/room/detailChat/getDatailChat";

export function useDetailChat({ roomId }: ContentProps) {
  const [detailChat, setDetailChat] = useState<ChatDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const fetchDetailChat = async () => {
    if (!roomId) {
      setDetailChat(null);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const data = await GetDetailChat(roomId);
    setDetailChat(data.chat || null);
    setIsLoading(false);
  };
  useEffect(() => {
      fetchDetailChat();
  }, [roomId]);
  return { detailChat, isLoading, fetchDetailChat };
}