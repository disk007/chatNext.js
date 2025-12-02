import { useEffect, useState } from "react";
import { GetRoom } from "../api/room/getRoom";
import { ListChat, userIdProps } from "../interface/listChat";
import { io } from "socket.io-client";
import id from "zod/v4/locales/id.js";
import { set } from "zod";

const socket = io("http://localhost:3000", {
    path: "/api/socket",
});

export function useListChat({ roomId }: userIdProps = {}) {
    const [rooms, setRooms] = useState<ListChat[] | null>(null);
    const [loading, setLoading] = useState(true);
    const updateMessageById = (roomId: number, updatedMsg: any) => {
        const formattedMsg = {
            id: updatedMsg.id,
            content: updatedMsg.content,
            createdAt: updatedMsg.createdAt,
            sender: {
                id: updatedMsg.userId,
                username: updatedMsg.username,
            },
            anotherChat: updatedMsg.anotherChat ?? false,
        };
        setRooms(prev =>
            prev?.map(room => {
                if (room.id !== roomId) return room;
                const messageExists = room.messages.some(msg => msg.id === formattedMsg.id);
                return {
                    ...room,
                    messages: messageExists
                        ? room.messages.map(msg =>
                            msg.id === formattedMsg.id ? { ...msg, ...formattedMsg } : msg
                        )
                        : [...room.messages, formattedMsg], 
                    unreadCount: (room.unreadCount ?? 0) + 1,
                };
            }) || []
        );
    };
    const fetchRooms = async () => {
        const data = await GetRoom();
        setRooms(data.rooms || null);
        setLoading(false);
    };
    useEffect(() => {
        fetchRooms();
    }, []);
    useEffect(() => {
        socket.emit("join-room", roomId);
        socket.on("room-read", (roomId) => {
            setRooms(prev =>
                prev?.map(room =>
                    room.id === Number(roomId)
                        ? { ...room, unreadCount: 0 }
                        : room
                ) || []
            );
        });
        socket.on("update-message", (newMsg) => {
            console.log("update event data:", newMsg);
            updateMessageById(newMsg.roomId, newMsg.message);
        });
        return () => {
            socket.off("room-read");
            socket.off("update-message");
        };
    }, [roomId]);

    return { rooms, loading, fetchRooms, setRooms };
}