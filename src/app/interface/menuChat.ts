type menuChat = {
    approvedCount:number,
    pendingCount:number,
    role:string | null
}

interface ModalMembers {
  title: string;
  roomId:string;
  role:string;
  onClose: () => void;
}
interface ModalApproveMembers {
  title: string;
  roomId:string;
  onClose: () => void;
}

interface ModalChageGroupName {
  title: string;
  roomId:string;
  name:string | null;
  onClose: () => void;
}
interface propMenuChat  {
    roomId: string | null;
    onClose: () => void;
}


interface PropMembers {
  user: {
    id: number;
    username: string;
  };
}
