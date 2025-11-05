import { ClockIcon, UsersIcon } from "@heroicons/react/24/solid";
import { EllipsisVerticalIcon, PencilIcon } from "@heroicons/react/24/outline"
import { useEffect, useRef, useState } from "react";
import { useClickOutside } from "../hook/useClickOutside";
import { useMenuChat } from "../hook/useMenuChat";
import { ModalApproveMembers, ModalChageGroupName, ModalMembers } from "./modal";

const MenuChat = ({ roomId,name }: ContentNameProps) => {
    const [open, setOpen] = useState(false);
    const [openModal, setModalOpen] = useState("");
    const menuRef = useRef<HTMLDivElement>(null);
    const { menuChat, isLoading, fetchMenuChat } = useMenuChat({ roomId });

    const handleToggleMenu = async () => {
        if (!open) {
            setOpen(true);
            await fetchMenuChat();
        } else {
            setOpen(false);
        }
    };
    useClickOutside(menuRef, () => setOpen(false));
    const OpenModal = (val: string) => {
        setModalOpen(val)
    }
    return (
        <>
            <div className="relative" ref={menuRef}>
                <EllipsisVerticalIcon
                    className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer"
                    onClick={handleToggleMenu}
                />
                {open && (
                    <div className="absolute right-0 mt-2 w-56 bg-[#0F172A] border border-gray-700 rounded shadow-lg z-50 text-[#E2E8F0] overflow-hidden">
                        {isLoading ? (
                            // 🔹 แสดง loading ชัดเจน
                            <div className="p-4 text-center animate-pulse text-gray-400">
                                Loading...
                            </div>
                        ) :
                            (
                                <>
                                    {/* All Members */}
                                    <div className="flex justify-between items-center py-3 px-4 hover:bg-[#1E293B] cursor-pointer transition-colors duration-200 border-b border-gray-700" onClick={() => { OpenModal("members") }}>
                                        <div className="flex items-center gap-2">
                                            <UsersIcon className="w-5 h-5 text-[#38BDF8]" />
                                            <span className="text-sm font-medium">All Members</span>
                                        </div>
                                        <span className="text-[#38BDF8] font-semibold">{menuChat?.approvedCount}</span>
                                    </div>

                                    {/* Pending Approval */}
                                    {menuChat?.pendingCount == null &&
                                        <div className="flex justify-between items-center py-3 px-4 hover:bg-[#1E293B] cursor-pointer transition-colors duration-200 border-b border-gray-700" onClick={() => { OpenModal("approveMembers") }}>
                                            <div className="flex items-center gap-2">
                                                <ClockIcon className="w-5 h-5 text-yellow-400" />
                                                <span className="text-sm font-medium">Pending Approval</span>
                                            </div>
                                            <span className="text-yellow-400 font-semibold">{menuChat?.pendingCount}</span>
                                        </div>
                                    }
                                    {/* Change Group Name */}
                                    <div
                                        className="flex justify-between items-center py-3 px-4 hover:bg-[#1E293B] cursor-pointer transition-colors duration-200"
                                        onClick={() => OpenModal("renameGroup")}
                                    >
                                        <div className="flex items-center gap-2">
                                            <PencilIcon className="w-5 h-5 text-green-400" />
                                            <span className="text-sm font-medium">Change Group Name</span>
                                        </div>
                                    </div>

                                </>
                            )}
                    </div>
                )}
            </div>
            {openModal == "members" && roomId &&
                <ModalMembers
                    title="Members"
                    roomId={roomId}
                    onClose={() => setModalOpen("")}
                    role={menuChat?.role ?? ""}
                />
            }
            {openModal == "approveMembers" && roomId &&
                <ModalApproveMembers
                    title="Approve Members"
                    roomId={roomId}
                    onClose={() => setModalOpen("")}
                />
            }
            {openModal == "renameGroup" && roomId &&
                <ModalChageGroupName
                    name={name}
                    title="Rename Chat"
                    roomId={roomId}
                    onClose={() => setModalOpen("")}
                />
            }
        </>
    )
}

export default MenuChat