'use client'

import { useEffect, useState } from "react";
import { GetDetailChat } from "../api/room/detailChat/getDatailChat";
import { io } from "socket.io-client";
import {ContentProps,ChatDetail} from "../interface/DetailChat"

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
    // if (!roomId) return;

    // // join room
    // socket.emit("join-room", roomId);

    // fetch ข้อมูลครั้งแรก
    fetchDetailChat();

    // subscribe message ใหม่
    // const handleNewMessage = async (message: any) => {
    //   console.log("Received new-message:", message);
    //   // ถ้าต้องการ fetch ใหม่จาก API
    //   await fetchDetailChat();

    //   // หรือถ้าแค่ map content
    //   // setDetailChat(prev => prev ? { ...prev, messages: [...prev.messages, { content: message.message }] } : prev);
    // };

    // socket.on("new-message", handleNewMessage);

    // return () => {
    //   socket.off("new-message", handleNewMessage);
    // };
  }, [roomId]);
  return { detailChat, isLoading, fetchDetailChat };
}