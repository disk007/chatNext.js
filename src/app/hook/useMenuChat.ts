import { useEffect, useState } from "react";
import { getMenuChat } from "../components/action/getMenuChat";

export function useMenuChat({ roomId }: ContentProps){
    const [menuChat,setMenuChat] = useState<menuChat | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const fetchMenuChat = async () => {
        if (!roomId) {
          setMenuChat(null);
          setIsLoading(false);
          return;
        }
        setIsLoading(true);
        const data = await getMenuChat(roomId);
        setMenuChat(data.messages || null);
        setIsLoading(false);
    };
    return { menuChat, isLoading, fetchMenuChat };
}