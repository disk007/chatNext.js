"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMenuChat = useMenuChat;
exports.useMembers = useMembers;
exports.useApproveMembers = useApproveMembers;
const react_1 = require("react");
const getMenuChat_1 = require("../components/action/getMenuChat");
const getMembers_1 = require("../components/action/getMembers");
const getApproveMembers_1 = require("../components/action/getApproveMembers");
function useMenuChat({ roomId }) {
    const [menuChat, setMenuChat] = (0, react_1.useState)(null);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const fetchMenuChat = async () => {
        if (!roomId) {
            setMenuChat(null);
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        const data = await (0, getMenuChat_1.getMenuChat)(roomId);
        setMenuChat(data.messages || null);
        setIsLoading(false);
    };
    return { menuChat, isLoading, fetchMenuChat };
}
function useMembers({ roomId }) {
    const [members, setMembers] = (0, react_1.useState)(null);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const fetchMembers = async () => {
        if (!roomId) {
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        const data = await (0, getMembers_1.getMembers)(roomId);
        setMembers(data.messages || null);
        setIsLoading(false);
    };
    (0, react_1.useEffect)(() => {
        fetchMembers();
    }, []);
    return { members, isLoading, fetchMembers };
}
function useApproveMembers({ roomId }) {
    const [members, setMembers] = (0, react_1.useState)(null);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const fetchMembers = async () => {
        if (!roomId) {
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        const data = await (0, getApproveMembers_1.getApproveMembers)(roomId);
        setMembers(data.messages || null);
        setIsLoading(false);
    };
    (0, react_1.useEffect)(() => {
        fetchMembers();
    }, []);
    return { members, isLoading, fetchMembers };
}
