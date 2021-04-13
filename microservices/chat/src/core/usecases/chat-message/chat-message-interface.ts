import ChatMessage from "../../entities/chat-message/chat-message";

export interface IChatMessage {
    insert(chat_message: ChatMessage): Promise<boolean>;
    update(chat_message: ChatMessage): Promise<boolean>;
    get(room_id: string, last_message_id: string): Promise<ChatMessage[]>;
}
