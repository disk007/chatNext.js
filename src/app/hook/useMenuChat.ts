import { useEffect, useState } from "react";
import { getMenuChat } from "../components/action/getMenuChat";
import { getMembers } from "../components/action/getMembers";
import { da, fa } from "zod/locales";
import { getApproveMembers } from "../components/action/getApproveMembers";
import { ContentProps } from "../interface/DetailChat";
import {menuChat,PropMembers} from "../interface/menuChat"


export function useMenuChat({ roomId }: ContentProps) {
  const [menuChat, setMenuChat] = useState<menuChat | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const fetchMenuChat = async () => {
    if (!roomId) {
      setMenuChat(null);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const data = await getMenuChat(roomId);
    setMenuChat(data.messages || null);
    setIsLoading(false);
  };
  return { menuChat, isLoading, fetchMenuChat };
}

export function useMembers({ roomId }: ContentProps) {
  const [members,setMembers] = useState<PropMembers [] | null>(null)
  const [isLoading, setIsLoading] = useState(true);
  const fetchMembers = async () => {
    if(!roomId){
      setIsLoading(false);
      return
    }
    setIsLoading(true)
    const data = await getMembers(roomId)
    setMembers(data.messages || null);
    setIsLoading(false);
  }
  useEffect(() =>{
    fetchMembers()
  },[])
  return {members,isLoading,fetchMembers}
}

export function useApproveMembers({ roomId }: ContentProps) {
  const [members,setMembers] = useState<PropMembers [] | null>(null)
  const [isLoading, setIsLoading] = useState(true);
  const fetchMembers = async () => {
    if(!roomId){
      setIsLoading(false);
      return
    }
    setIsLoading(true)
    const data = await getApproveMembers(roomId)
    setMembers(data.messages || null);
    setIsLoading(false);
  }
  useEffect(() =>{
    fetchMembers()
  },[])
  return {members,isLoading,fetchMembers}
}
