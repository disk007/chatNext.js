"use client";

import React, { useActionState, useState } from "react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "../ds/Button";
import { handleAddRoom } from "./action/addRoomChat";
import { showToast, ToastStatusEnum } from "../toast/toast";
import { JoinChatRoom } from "./action/joinChatRoom";
import { useApproveMembers, useMembers } from "../hook/useMenuChat";
import { da } from "zod/locales";
import { useModalRoot } from "../hook/useModalRoot";
import { actionMembers } from "./action/actionMembers";

type ModalProps = {
  title: string;
  onClose: () => void;
  placeholder: string;
};
export default function modalAddChat({ title, onClose, placeholder }: ModalProps) {
  const [container, setContainer] = React.useState<HTMLElement | null>(null);
  const [formValues, setFormValues] = useState({
    room: "",
  });
  const [message, formAction] = useActionState(handleAddRoom, null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };
  const resetformValues = () => {
    setFormValues({
      room: "",
    });
    onClose()
  }
  useEffect(() => {
    let el = document.getElementById("modal-root");
    if (!el) {
      el = document.createElement("div");
      el.id = "modal-root";
      document.body.appendChild(el);
    }
    setContainer(el);
  }, []);
  useEffect(() => {
    if (message?.status === "success") {
      showToast(ToastStatusEnum.SUCCESS, message.message);
      resetformValues();
    } else if (message?.status === "error") {
      showToast(ToastStatusEnum.ERROR, message.message);
    }
  }, [message]);

  if (!container) return null;

  return createPortal(
    <div className={`fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50`}>
      <div className={`bg-[#1E293B] text-[#E2E8F0] rounded-2xl p-6 w-full max-w-sm`}>
        <div className="text-lg font-semibold mb-2 text-[#38BDF8]">
          {title}
        </div>
        <form className="flex flex-col" >
          <div className="w-full mb-4">
            <input
              name="room"
              placeholder={placeholder}
              value={formValues.room}
              onChange={handleChange}
              className="w-full px-3 py-3 rounded bg-[#334155] border border-[#475569] focus:outline-none focus:ring-2 focus:ring-[#F97316] transition-colors text-white"
            />
            {message?.errors?.room && (
              <p className="text-xs mt-1 text-red-500">{message.errors.room}</p>
            )}
          </div>
          <div className="flex justify-end space-x-3 mt-2">
            <button
              onClick={onClose}
              className="cursor-pointer px-4 py-2 rounded bg-[#334155] hover:bg-[#475569] transition-colors"
            >
              Cancel
            </button>
            <Button
              type="submit"
              text="Add"
              className="px-4 py-2 rounded bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold transition-colors"
            />
          </div>
        </form>
      </div>
    </div>,
    container
  );
}

export function ModalJoinChat({ title, onClose, placeholder }: ModalProps) {
  const container = useModalRoot();
  const [formValues, setFormValues] = useState({
    code: "",
  });
  const [message, formAction] = useActionState(JoinChatRoom, null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };
  const resetformValues = () => {
    setFormValues({
      code: "",
    });
    onClose()
  }
  useEffect(() => {
    if (message?.status === "success") {
      showToast(ToastStatusEnum.SUCCESS, message.message);
      resetformValues();
    } else if (message?.status === "error") {
      showToast(ToastStatusEnum.ERROR, message.message);
    } else if (message?.status === "warning") {
      showToast(ToastStatusEnum.WARNING, message.message)
    }
  }, [message]);
  if (!container) return null;

  return createPortal(
    <div className={`fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50`}>
      <div className={`bg-[#1E293B] text-[#E2E8F0] rounded-2xl p-6 w-full max-w-sm`}>
        <div className="text-lg font-semibold mb-2 text-[#38BDF8]">
          {title}
        </div>
        <form className="flex flex-col" action={formAction}>
          <div className="w-full mb-4">
            <input
              name="code"
              placeholder={placeholder}
              value={formValues.code}
              onChange={handleChange}
              className="w-full px-3 py-3 rounded bg-[#334155] border border-[#475569] focus:outline-none focus:ring-2 focus:ring-[#F97316] transition-colors text-white"
            />
            {message?.errors?.code && (
              <p className="text-xs mt-1 text-red-500">{message.errors.code}</p>
            )}
          </div>
          <div className="flex justify-end space-x-3 mt-2">
            <button
              onClick={onClose}
              className="cursor-pointer px-4 py-2 rounded bg-[#334155] hover:bg-[#475569] transition-colors"
            >
              Cancel
            </button>
            <Button
              type="submit"
              text="Join"
              className="px-4 py-2 rounded bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold transition-colors"
            />
          </div>
        </form>
      </div>
    </div>,
    container
  );
}

export function ModalMembers({ title, roomId, onClose,role }: ModalMembers) {
  const { members, isLoading, fetchMembers } = useMembers({ roomId });
  const container = useModalRoot()
  const [message, formAction] = useActionState(actionMembers, null);
  const [actionType, setActionType] = useState('')
  const [selected, setSelected] = useState<number[]>([]);
  const handleToggle = (id: number) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };
  useEffect(() => {
    if (message?.status === "success") {
      showToast(ToastStatusEnum.SUCCESS, message.message);
      fetchMembers()
      // resetformValues();
    } else if (message?.status === "error") {
      showToast(ToastStatusEnum.ERROR, message.message);
    } else if (message?.status === "warning") {
      showToast(ToastStatusEnum.WARNING, message.message)
    }
  }, [message]);
  if (!container) return null;

  return createPortal(
    <div className={`fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50`}>
      <div className={`bg-[#1E293B] text-[#E2E8F0] rounded-2xl p-6 w-full max-w-sm`}>
        <form action={formAction}>
          <div className="text-lg font-semibold mb-2 text-[#38BDF8]">
            {title}
          </div>
          <div className="max-h-80 overflow-y-auto space-y-3">
            {isLoading ? (
              <div className="p-4 text-center animate-pulse text-gray-400">
                Loading...
              </div>
            ) : (
              (members?.map((data, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-[#334155] hover:bg-[#475569] p-3 rounded-lg transition-colors duration-200"
                >
                  <span className="text-sm text-[#E2E8F0] font-medium">{data.user.username}</span>
                {
                  role == "admin" &&
                  <input
                    type="checkbox"
                    checked={selected.includes(data.user.id)}
                    name="selected"
                    value={data.user.id}
                    onChange={() => handleToggle(data.user.id)}
                    className="appearance-none h-5 w-5 border-2 border-[#38BDF8] rounded-md checked:bg-[#38BDF8] transition-all duration-200 cursor-pointer"
                  />
                }
                </div>
              )))
            )}

          </div>
          <div className="flex justify-end space-x-3 mt-4">
            <input type="hidden" name="actionType" value={actionType} />
            <input type="hidden" name="roomId" value={roomId} />
            <button
              onClick={onClose}
              className="cursor-pointer px-4 py-2 rounded bg-[#334155] hover:bg-[#475569] transition-colors"
            >
              Cancel
            </button>
            {
            role == "admin" &&
              <Button
                type="submit"
                text="Delete"
                onClick={() => setActionType("reject")}
                disabled={selected.length === 0} // ถ้ายังไม่เลือกให้ disable
                className={`px-4 py-2 rounded font-semibold transition-colors ${selected.length === 0
                  ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700 text-white"
                  }`}
              />
            }
          </div>
        </form>
      </div>
    </div>,
    container
  );
}

export function ModalApproveMembers({ title, roomId, onClose }: ModalApproveMembers) {
  const { members, isLoading, fetchMembers } = useApproveMembers({ roomId });
  const container = useModalRoot();
  const [actionType, setActionType] = useState('')
  const [message, formAction] = useActionState(actionMembers, null);
  const [selected, setSelected] = useState<number[]>([]);
  const handleToggle = (id: number) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };
  useEffect(() => {
    if (message?.status === "success") {
      showToast(ToastStatusEnum.SUCCESS, message.message);
      fetchMembers()
      // resetformValues();
    } else if (message?.status === "error") {
      showToast(ToastStatusEnum.ERROR, message.message);
    } else if (message?.status === "warning") {
      showToast(ToastStatusEnum.WARNING, message.message)
    }
  }, [message]);
  if (!container) return null;

  return createPortal(
    <div className={`fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50`}>
      <div className={`bg-[#1E293B] text-[#E2E8F0] rounded-2xl p-6 w-full max-w-sm`}>
        <form action={formAction}>
          <div className="text-lg font-semibold mb-2 text-[#38BDF8]">
            {title}
          </div>
          <div className="max-h-80 overflow-y-auto space-y-3">
            {isLoading ? (
              <div className="p-4 text-center animate-pulse text-gray-400">
                Loading...
              </div>
            ) : (
              (members?.map((data, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-[#334155] hover:bg-[#475569] p-3 rounded-lg transition-colors duration-200"
                >
                  <span className="text-sm text-[#E2E8F0] font-medium">{data.user.username}</span>

                  <input
                    type="checkbox"
                    checked={selected.includes(data.user.id)}
                    onChange={() => handleToggle(data.user.id)}
                    name="selected"
                    value={data.user.id}
                    className="appearance-none h-5 w-5 border-2 border-[#38BDF8] rounded-md checked:bg-[#38BDF8] transition-all duration-200 cursor-pointer"
                  />
                </div>
              )))
            )}
          </div>

          <div className="flex justify-end space-x-3 mt-4">
            <input type="hidden" name="actionType" value={actionType} />
            <input type="hidden" name="roomId" value={roomId} />
            <button
              onClick={onClose}
              className="cursor-pointer px-4 py-2 rounded bg-[#334155] hover:bg-[#475569] transition-colors"
            >
              Cancel
            </button>
            <Button
              type="submit"
              text="Approve"
              onClick={() => setActionType("approve")}
              disabled={selected.length === 0}
              className={`px-4 py-2 rounded font-semibold transition-colors ${selected.length === 0
                ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white"
                }`}
            />

            {/* ปุ่ม Reject */}
            <Button
              type="submit"
              text="Reject"
              onClick={() => setActionType("reject")}
              disabled={selected.length === 0}
              className={`px-4 py-2 rounded font-semibold transition-colors ${selected.length === 0
                ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                : "bg-yellow-500 hover:bg-yellow-600 text-white"
                }`}
            />
          </div>
        </form>
      </div>
    </div>,
    container
  );
}

export function ModalChageGroupName({ title,name, roomId, onClose }: ModalChageGroupName) {
  const { members, isLoading, fetchMembers } = useApproveMembers({ roomId });
  const container = useModalRoot();
  const [actionType, setActionType] = useState('')
  const [message, formAction] = useActionState(actionMembers, null);
  const [selected, setSelected] = useState<number[]>([]);
  const handleToggle = (id: number) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };
  useEffect(() => {
    if (message?.status === "success") {
      showToast(ToastStatusEnum.SUCCESS, message.message);
      fetchMembers()
      // resetformValues();
    } else if (message?.status === "error") {
      showToast(ToastStatusEnum.ERROR, message.message);
    } else if (message?.status === "warning") {
      showToast(ToastStatusEnum.WARNING, message.message)
    }
  }, [message]);
  if (!container) return null;

  return createPortal(
    <div className={`fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50`}>
      <div className={`bg-[#1E293B] text-[#E2E8F0] rounded-2xl p-6 w-full max-w-sm`}>
        <form action={formAction}>
          <div className="text-lg font-semibold mb-2 text-[#38BDF8]">
            {title}
          </div>
          <div className="max-h-80 overflow-y-auto space-y-3">
            <input
              id="newName"
              name="newName"
              type="text"
              value={name ?? ""}
              placeholder="Enter new group name..."
              className="w-full p-2 rounded-md bg-[#1E293B] border border-[#38BDF8] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all"
              required
            />
          </div>

          <div className="flex justify-end space-x-3 mt-4">
            <input type="hidden" name="actionType" value={actionType} />
            <input type="hidden" name="roomId" value={roomId} />
            <button
              onClick={onClose}
              className="cursor-pointer px-4 py-2 rounded bg-[#334155] hover:bg-[#475569] transition-colors"
            >
              Cancel
            </button>
            <Button
              type="submit"
              text="Change"
              className="px-4 py-2 rounded font-semibold transition-colors bg-[#38BDF8] hover:bg-[#0EA5E9] text-white"
            />
          </div>
        </form>
      </div>
    </div>,
    container
  );
}