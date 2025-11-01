type menuChat = {
    approvedCount:number,
    pendingCount:number
}

interface ModalMembers {
  title: string;
  roomId:string;
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
