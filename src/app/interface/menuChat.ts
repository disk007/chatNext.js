type menuChat = {
    approvedCount:number,
    pendingCount:number
}
interface propMenuChat  {
    roomId: string | null;
    onClose: () => void;
}