export interface InterfaceDeleteMessage{
    messageId: number;
}
export interface interfaceEditMessage{
    messageId: number;
    content?: string ;
    onClose: () => void;
    title: string;
}