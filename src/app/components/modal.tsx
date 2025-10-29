"use client";

import React, { useActionState, useState } from "react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "../ds/Button";
import { handleAddRoom } from "./action/addRoomChat";
import { showToast, ToastStatusEnum } from "../toast/toast";

type ModalProps = {
  title: string;
  onClose: () => void;
  placeholder: string;
};
export default function modalAddChat({ title, onClose,placeholder }: ModalProps) {
  const [container, setContainer] = React.useState<HTMLElement | null>(null);
  const [formValues, setFormValues] = useState({
    room: "",
  });
  const [message, formAction] = useActionState(handleAddRoom,null);
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
      <div  className={`bg-[#1E293B] text-[#E2E8F0] rounded-2xl p-6 w-full max-w-sm`}>
        <div className="text-lg font-semibold mb-2 text-[#38BDF8]">
          {title}
        </div>
        <form className="flex flex-col" action={formAction}>
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

export function ModalJoinChat({ title, onClose,placeholder }: ModalProps) {
  const [container, setContainer] = React.useState<HTMLElement | null>(null);
  const [formValues, setFormValues] = useState({
    room: "",
  });
  const [message, formAction] = useActionState(handleAddRoom,null);
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
      <div  className={`bg-[#1E293B] text-[#E2E8F0] rounded-2xl p-6 w-full max-w-sm`}>
        <div className="text-lg font-semibold mb-2 text-[#38BDF8]">
          {title}
        </div>
        <form className="flex flex-col" action={formAction}>
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