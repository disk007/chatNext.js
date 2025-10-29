
import { FiLogOut } from "react-icons/fi"
import { getProfile } from "../api/profile/getProfile";

const Footer = async () => {
    const profile = await getProfile();
    return(
        <>
            <div className="flex justify-between mt-auto border-t border-[#1E293B] px-4 py-3 text-sm text-[#94A3B8]">
                <div>Username : {profile?.username}</div>
                <FiLogOut className="w-6 h-6 hover:text-white cursor-pointer" />
            </div>
        </>
    )
}
export default Footer;