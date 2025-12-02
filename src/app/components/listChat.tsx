"use client";
import { useEffect, useState } from "react";
import Content from "./content";
import { useListChat } from "../hook/useListChat";

const ListChat = () => {
    const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
    const {rooms,loading} = useListChat({roomId: selectedRoomId});

    if (loading) {
        return (
            <>
                <div className="p-4 text-center text-gray-500">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500 mx-auto mb-2"></div>
                    Loading chat rooms...
                </div>
                <Content roomId={selectedRoomId} />
            </>
        );
    }
    return (
        <>
            <div className="w-full border-y-2 shadow-sm overflow-hidden border-[#1E293B]">
                {rooms && rooms.length > 0 ? (
                    rooms.map((room: any, index: number) => {
                        // ดึงข้อความล่าสุดจาก array messages
                        const lastMessage = room.messages.length > 0
                            ? room.messages[room.messages.length - 1]
                            : null;

                        return (
                            <div
                                className="flex items-center justify-between p-3 border-b-2 border-[#1E293B] last:border-b-0 cursor-pointer"
                                key={index}
                                onClick={() => setSelectedRoomId(room.id)}
                            >
                                <div className="flex items-center space-x-3">
                                    <img
                                        src="https://i.pravatar.cc/40"
                                        alt="profile"
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <div>
                                        <h2 className="font-semibold text-lg">{room.name}</h2>
                                        {lastMessage ? (
                                            <p className="text-[#6B7280] text-sm">
                                                {lastMessage?.sender?.username || "Unknown"} : {lastMessage?.content || ""}
                                            </p>
                                        ) : (
                                            <p className="text-[#6B7280] text-sm">No messages yet</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    {lastMessage && (
                                        <span className="text-[#9CA3AF] text-xs">
                                            {new Date(lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    )}
                                    {room.unreadCount > 0 && (
                                        <span className="bg-[#22C55E] text-white text-xs font-semibold px-2 py-0.5 rounded-full mt-1">
                                            {room.unreadCount > 99 ? '99+' : room.unreadCount}
                                        </span>
                                    )}

                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="p-4 text-center text-gray-500">No chat rooms available.</p>
                )}
            </div>

            <Content roomId={selectedRoomId} />

        </>
    )
}
export default ListChat;