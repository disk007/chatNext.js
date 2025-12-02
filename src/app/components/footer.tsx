"use client";
import { FiLogOut } from "react-icons/fi"
import { useAuth } from "../ีuseConText/useAuth";

const Footer = () => {
    const {user}  = useAuth();
    return(
        <>
            <div className="flex justify-between mt-auto border-t border-[#1E293B] px-4 py-3 text-sm text-[#94A3B8]">
                <div>Username : {user?.username}</div>
                <FiLogOut className="w-6 h-6 hover:text-white cursor-pointer" />
            </div>
        </>
    )
}
export default Footer;