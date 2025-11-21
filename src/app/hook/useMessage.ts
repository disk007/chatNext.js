'use client'

import { useEffect, useState } from "react";
import { GetDetailChat } from "../api/room/detailChat/getDatailChat";
import { io } from "socket.io-client";
import {ContentProps,ChatDetail, Message} from "../interface/DetailChat"
import { GetMessages } from "../api/messages/getMessage";
import { set } from "zod";

const socket = io("http://localhost:3000", {
  path: "/api/socket",
});


export function useMessage({ roomId }: ContentProps) {
  const [message, setMessage] = useState<Message[] | null>(null);
  const [isLoadingMessage, setIsLoadingMessage,] = useState(true);
  const appendMessage = (newMessage: Message) => {
    setMessage(prev => prev ? [...prev, newMessage] : [newMessage]);
  };
  const fetchMessages = async () => {
    if (!roomId) {
      setIsLoadingMessage(false);
      setMessage(null);
      return;
    }
    setIsLoadingMessage(true);
    const data = await GetMessages(roomId);
    setMessage(data.chat || null);
    setIsLoadingMessage(false);
  };
  useEffect(() => {
    if (!roomId) return;

    // join room
    socket.emit("join-room", roomId);

    // fetch ข้อมูลครั้งแรก
    fetchMessages();

    // const handleNewMessage = (data: any) => {
    //     console.log("Received new-message in useMessage:", data);
    //     appendMessage({
    //     id: data.id,
    //     content: data.message,
    //     createdAt: data.createdAt,
    //     anotherChat: false
    //     });
    // };

    socket.on("new-message", (newMsg) => {
        console.log("new-message event data:", newMsg);
        appendMessage({
            id: newMsg.id,
            content: newMsg.message,
            createdAt: newMsg.createdAt,
            anotherChat: false
        });
    });
    
    return () => {
      socket.off("new-message");
    };
  }, [roomId]);
  return { message, isLoadingMessage, fetchMessages };
}