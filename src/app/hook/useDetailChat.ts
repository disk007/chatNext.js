'use client'

import { useEffect, useState } from "react";
import { GetDetailChat } from "../api/room/detailChat/getDatailChat";
import { io } from "socket.io-client";
import {ContentProps,ChatDetail} from "../interface/DetailChat"
import da from "zod/v4/locales/da.js";
import { useListChat } from "./useListChat";

const socket = io("http://localhost:3000", {
  path: "/api/socket",
});


export function useDetailChat({ roomId }: ContentProps) {
  const [detailChat, setDetailChat] = useState<ChatDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const fetchDetailChat = async () => {
    if (!roomId) {
      setIsLoading(false);
      setDetailChat(null);
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