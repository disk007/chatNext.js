"use client";
import { use, useEffect, useRef, useState } from "react";
import { GetDetailChat } from "../api/room/detailChat/getDatailChat";
import { EllipsisVerticalIcon, PaperClipIcon } from "@heroicons/react/24/outline";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import SendChat from "./sendChat";
import { is } from "zod/locales";
import PendingApproval from "./PendingApproval";
import { useDetailChat } from "../hook/useDetailChat";
import MenuChat from "./menuChat";
import { ContentProps } from "../interface/DetailChat";
import { useMessage } from "../hook/useMessage";
import { getProfile } from "../api/profile/getProfile";
import { useAuth } from "../ีuseConText/useAuth";
import ModalMenuMessage from "./modalMenuMessage";

import { useClickOutside } from "../hook/useClickOutside";

const Content = ({ roomId }: ContentProps) => {
  const { user } = useAuth();
  const prevLengthRef = useRef(0);
  const [isEditing, setIsEditing] = useState(false);
  const isImage = (name: any) =>
    /\.(jpg|jpeg|png|gif|webp)$/i.test(name);


  const [openId, setOpenId] = useState<number | null>(null);
  const [openIdFile, setOpenIdFile] = useState<number | null>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const refs = useRef<{ [key: number]: HTMLElement | null }>({});
  useClickOutside(
    {
      current: openId ? refs.current[openId] : null,
    },
    () => {
      if (!isEditing) {
        setOpenId(null);   // ← ปิดเมนูเฉพาะตอนยังไม่เปิด modal edit
      }
    }
  );


  const { detailChat, isLoading } = useDetailChat({ roomId });
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { message, isLoadingMessage } = useMessage({ roomId });
  useEffect(() => {
    if (!isLoadingMessage) {
      const isNewMessageAdded =
        message && message.length > prevLengthRef.current;
      if (isNewMessageAdded) {
        scrollToBottom();
      }

      prevLengthRef.current = message?.length || 0;
    }
  }, [message, isLoadingMessage]);
  return (
    <div className="ml-[450px] h-screen w-[calc(100%-450px)] flex flex-col fixed bg-linear-to-b from-[#0F172A] to-[#1E293B] text-[#E2E8F0]">
      {isLoadingMessage && (
        <div className="flex-1 flex justify-center items-center">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 border-4 border-t-[#38BDF8] border-gray-700 rounded-full animate-spin"></div>
            <p className="mt-3 text-gray-400">Loading chat...</p>
          </div>
        </div>
      )}
      {!isLoadingMessage && detailChat && (
        <>
          {detailChat.isApproved ? (
            <>
              <div className="p-4 border-2 border-[#1E293B] flex-row flex justify-between items-center">
                <div>
                  {detailChat.name}
                </div>
                <MenuChat roomId={roomId} name={detailChat.name} />
              </div>
              {message?.length === 0 ? (
                <div className="flex-1 flex flex-col justify-center items-center">
                  <p className="text-gray-500 mb-4">No messages yet. Start the conversation!</p>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto p-4 space-y-4" >
                  {message?.map((msg, key) => (
                    <div key={key}>
                      {/* ข้อความฝั่งซ้าย (คนอื่น) */}
                      {msg.senderId != user?.id && (
                        <div className="flex items-start space-x-3">
                          <img
                            src="https://i.pravatar.cc/40?img=1"
                            alt="profile"
                            className="w-10 h-10 rounded-full"
                          />
                          <div className="flex flex-col items-start space-y-1 max-w-xs">
                            {msg.content && msg.content.trim() !== "" && (
                              <div className="relative  bg-gray-700 text-white p-3 rounded-lg ">
                                {msg.content}

                                <div
                                  ref={(el) => { if (el) refs.current[msg.id] = el; }}
                                >
                                  {user?.role === "admin" && (

                                    <EllipsisVerticalIcon
                                      className="w-5 h-5 text-gray-400 cursor-pointer absolute -right-6 top-1/2 -translate-y-1/2 hover:text-gray-200"
                                      onClick={(e) => {
                                        e.stopPropagation(); // ⬅ สำคัญ!!
                                        setOpenId(openId === msg.id ? null : msg.id);
                                      }}
                                    />
                                  )}

                                  {/* เมนู */}
                                  {openId === msg.id && (
                                    <div className="absolute right-[-150px] top-2/3 -translate-y-1/2">
                                      <ModalMenuMessage onOpenEdit={() => setIsEditing(true)} onCloseEdit={() => { setIsEditing(false); setOpenId(null); }} messageId={msg.id} content={msg.content} />
                                    </div>

                                  )}
                                </div>
                              </div>
                            )}
                            {msg.files && msg.files.length > 0 && (
                              <div className="flex flex-col gap-3 mt-1 relative">
                                {user?.role === "admin" && (
                                  <EllipsisVerticalIcon
                                    className="
                                      w-5 h-5
                                      text-gray-400
                                      cursor-pointer
                                      absolute
                                      -right-6
                                      top-2
                                      hover:text-gray-200
                                    "
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setOpenId(openId === msg.id ? null : msg.id);
                                    }}
                                  />
                                )}

                                {openId === msg.id && (
                                  <div className="absolute right-[-150px]">
                                    <ModalMenuMessage
                                      onOpenEdit={() => setIsEditing(true)}
                                      onCloseEdit={() => {
                                        setIsEditing(false);
                                        setOpenId(null);
                                      }}
                                      messageId={msg.id}
                                      content={msg.content}
                                    />
                                  </div>
                                )}
                                {msg.files.map((file: any, index: any) => {
                                  const image = /\.(jpg|jpeg|png|gif|webp)$/i.test(file.originalName);

                                  return image ? (
                                    // 🖼 IMAGE PREVIEW
                                    <a
                                      key={index}
                                      href={`${process.env.NEXT_PUBLIC_API_URL}/uploadFile/${file.storedName}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="max-w-xs"
                                    >
                                      <img
                                        src={`${process.env.NEXT_PUBLIC_API_URL}/uploadFile/${file.storedName}`}
                                        alt={file.originalName}
                                        className="
                                          rounded-lg
                                          max-w-xs
                                          max-h-56
                                          object-cover
                                          hover:opacity-90
                                          transition
                                        "
                                      />
                                    </a>
                                  ) : (
                                    // 📎 FILE BUBBLE
                                    <a
                                      key={index}
                                      href={`${process.env.NEXT_PUBLIC_API_URL}/uploadFile/${file.storedName}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="
                                        flex items-center gap-2
                                        bg-blue-600
                                        text-white
                                        px-3 py-2
                                        rounded-md
                                        hover:bg-blue-600/80
                                        transition
                                        max-w-xs
                                      "
                                    >
                                      <PaperClipIcon className="w-4 h-4 text-white/80 shrink-0" />
                                      <span className="truncate">{file.originalName}</span>
                                    </a>
                                  );
                                })}
                              </div>
                            )}

                          </div>

                        </div>
                      )}

                      {/* ข้อความฝั่งขวา (ตัวเรา) */}
                      {msg.senderId == user?.id && (
                        <div className="flex justify-end items-start space-x-3">
                          <div className="flex flex-col items-end space-y-1 max-w-xs">

                            {/* 🔹 Message bubble */}
                            {msg.content && msg.content.trim() !== "" && (
                              <div className="relative bg-blue-600 text-white p-3 rounded-lg">
                                <div
                                  ref={(el) => {
                                    if (el) refs.current[msg.id] = el;
                                  }}
                                >
                                  <EllipsisVerticalIcon
                                    className="w-5 h-5 text-gray-400 cursor-pointer absolute -left-6 top-1/2 -translate-y-1/2 hover:text-gray-200"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setOpenId(openId === msg.id ? null : msg.id);
                                    }}
                                  />

                                  {openId === msg.id && (
                                    <div className="absolute left-[-150px] top-2/3 -translate-y-1/2">
                                      <ModalMenuMessage
                                        onOpenEdit={() => setIsEditing(true)}
                                        onCloseEdit={() => {
                                          setIsEditing(false);
                                          setOpenId(null);
                                        }}
                                        messageId={msg.id}
                                        content={msg.content}
                                      />
                                    </div>
                                  )}
                                </div>

                                {msg.content}
                              </div>
                            )}

                            {msg.files && msg.files.length > 0 && (
                              <div className="flex flex-col gap-3 mt-1 relative">
                                {user?.role === "admin" && (
                                  <EllipsisVerticalIcon
                                    className="
                                      w-5 h-5
                                      text-gray-400
                                      cursor-pointer
                                      absolute
                                      -left-6
                                      top-2
                                      hover:text-gray-200
                                    "
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setOpenIdFile(openIdFile === msg.id ? null : msg.id);
                                    }}
                                  />
                                )}

                                {openIdFile === msg.id && (
                                  <div className="absolute left-[-150px]">
                                    <ModalMenuMessage
                                      messageId={msg.id}
                                      type="file"
                                    />
                                  </div>
                                )}
                                {msg.files.map((file: any, index: any) => {
                                  const image = /\.(jpg|jpeg|png|gif|webp)$/i.test(file.originalName);

                                  return image ? (
                                    // 🖼 IMAGE PREVIEW
                                    <a
                                      key={index}
                                      href={`${process.env.NEXT_PUBLIC_API_URL}/uploadFile/${file.storedName}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="max-w-xs"
                                    >
                                      <img
                                        src={`${process.env.NEXT_PUBLIC_API_URL}/uploadFile/${file.storedName}`}
                                        alt={file.originalName}
                                        className="
                                          rounded-lg
                                          max-w-xs
                                          max-h-56
                                          object-cover
                                          hover:opacity-90
                                          transition
                                        "
                                      />
                                    </a>
                                  ) : (
                                    // 📎 FILE BUBBLE
                                    <a
                                      key={index}
                                      href={`${process.env.NEXT_PUBLIC_API_URL}/uploadFile/${file.storedName}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="
                                        flex items-center gap-2
                                        bg-blue-600
                                        text-white
                                        px-3 py-2
                                        rounded-md
                                        hover:bg-blue-600/80
                                        transition
                                        max-w-xs
                                      "
                                    >
                                      <PaperClipIcon className="w-4 h-4 text-white/80 shrink-0" />
                                      <span className="truncate">{file.originalName}</span>
                                    </a>
                                  );
                                })}

                              </div>
                            )}

                          </div>

                          {/* avatar */}
                          <img
                            src="https://i.pravatar.cc/40?img=2"
                            alt="profile"
                            className="w-10 h-10 rounded-full"
                          />
                        </div>
                      )}

                    </div>
                  ))}
                  <div ref={messagesEndRef}></div>
                </div>
              )}
              <SendChat roomId={roomId} />
            </>
          ) : (
            <PendingApproval />
          )}
        </>
      )}
    </div>
  );
};

export default Content;
