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
    if (data.status === 'success') {
      socket.emit("read-messages", roomId);
    }
    setIsLoadingMessage(false);
  };
  useEffect(() => {
    fetchMessages();
    socket.emit("join-room", roomId);
    socket.on("new-message", (newMsg) => {
        console.log("new-message event data:", newMsg);
        appendMessage({
            id: newMsg.message.id,
            content: newMsg.message.content,
            createdAt: newMsg.message.createdAt,
            senderId: newMsg.message.sendId,
        });
    });
    
    
    return () => {
      socket.off("new-message");
    };
  }, [roomId]);
  return { message, isLoadingMessage, fetchMessages };
}