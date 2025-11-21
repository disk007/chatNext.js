export interface menuChat {
    approvedCount:number,
    pendingCount:number,
    role:string | null
}

export interface interfaceMembers {
  title: string;
  roomId:string;
  role:string;
  onClose: () => void;
}
export interface interfaceApproveMembers {
  title: string;
  roomId:string;
  onClose: () => void;
}

export interface interfaceChageGroupName {
  title: string;
  roomId:string;
  name:string | null;
  onClose: () => void;
}
export interface propMenuChat  {
    roomId: string | null;
    onClose: () => void;
}


export interface PropMembers {
  user: {
    id: number;
    username: string;
  };
}
