"use client";

import { useEffect, useState } from "react";
import { GetDetailChat } from "../api/room/detailChat/getDatailChat";
import { EllipsisVerticalIcon, PaperClipIcon } from "@heroicons/react/24/outline";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import SendChat from "./sendChat";

type ContentProps = {
  roomId: string | null;
};
type Message = {
  anotherChat: boolean;
  id: number;
  content: string;
  createdAt: string;
};

type ChatDetail = {
  id: number;
  name: string;
  isGroup: boolean;
  messages: Message[];
};
const Content = ({ roomId }: ContentProps) => {
  const [detailChat, setDetailChat] = useState<ChatDetail | null>(null);
  const fetchDetailChat = async () => {
    if (!roomId) {
      setDetailChat(null);
      return;
    }
    const data = await GetDetailChat(roomId);
      setDetailChat(data.chat || null);
    };
    useEffect(() => {
        fetchDetailChat();
    }, [roomId]);
  return (
    <div className="ml-[450px] h-screen w-[calc(100%-450px)] flex flex-col fixed bg-gradient-to-b from-[#0F172A] to-[#1E293B] text-[#E2E8F0]">
      {detailChat && detailChat != null && (
        <>
          <div className="p-4 border-2 border-[#1E293B] flex-row flex justify-between items-center">
            <div>
              {detailChat.name}
            </div>
            <div>
              <EllipsisVerticalIcon className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>
          {detailChat.messages.length === 0 ? (
            <div className="flex-1 flex flex-col justify-center items-center">
              <p className="text-gray-500 mb-4">No messages yet. Start the conversation!</p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4 space-y-4" >
              {detailChat.messages.map((msg, key) => (
                <div key={key}>
                  
                  {/* ข้อความฝั่งซ้าย (คนอื่น) */}
                  {msg.anotherChat == true && (
                    <div className="flex items-start space-x-3">
                      <img
                        src="https://i.pravatar.cc/40?img=1"
                        alt="profile"
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="bg-gray-700 text-white p-3 rounded-xl max-w-xs">
                        {msg.content}
                      </div>
                    </div>
                  )}

                  {/* ข้อความฝั่งขวา (ตัวเรา) */}
                  {msg.anotherChat == false && (
                    <div className="flex items-start justify-end space-x-3">
                      <div className="bg-blue-600 text-white p-3 rounded-xl max-w-xs">
                        {msg.content}
                      </div>
                      <img
                        src="https://i.pravatar.cc/40?img=2"
                        alt="profile"
                        className="w-10 h-10 rounded-full"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          <SendChat roomId={roomId} />
        </>
      )}
    </div>
  );
};

export default Content;
