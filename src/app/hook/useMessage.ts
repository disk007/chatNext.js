'use client'

import { use, useEffect, useState } from "react";
import { GetDetailChat } from "../api/room/detailChat/getDatailChat";
import { io } from "socket.io-client";
import { ContentProps, ChatDetail, Message } from "../interface/DetailChat"
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
      console.log("Received new message via socket:", newMsg.files);
      appendMessage({
        id: newMsg.message.id,
        content: newMsg.message.content,
        createdAt: newMsg.message.createdAt,
        senderId: newMsg.message.senderId,
        files: newMsg.message.files,
      });
    });

    return () => {
      socket.off("new-message");
    };
  }, [roomId]);

  useEffect(() => {
    const handleDelete = (messageId: number,type: string) => {
      setMessage((prev: Message[] | null) => {
        if(!prev) return null;
        const update = prev.map((msg) => {
          if(msg.id !== messageId) return msg;
          if(type === "file") {
            return{
              ...msg,
              files:[]
            };
          }
          else if(type === "message") {
            return{
              ...msg,
              content:""
            };
          }
          return msg;
        });
        return update.filter(msg => !(msg.content === "" && msg.files.length === 0) );
      });
    };
    const handleEdit = (updatedMsg: Message) => {
      setMessage((prev: Message[] | null) =>
        prev
          ? prev.map((msg) =>
              msg.id === updatedMsg.id ? { ...msg, content:updatedMsg.content}:msg)
          : null
      );
    };
    socket.on("message-edited", handleEdit);
    socket.on("message-deleted", handleDelete);
    return () => {
      socket.off("message-deleted");
      socket.off("message-edited");
    };
  }, [])
  return { message, isLoadingMessage, fetchMessages };
}