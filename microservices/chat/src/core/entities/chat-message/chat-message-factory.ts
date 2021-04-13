import { service_const } from "../../../config";
import ChatMessage from "./chat-message";

export function buildMakeChatMessage() {
    return function makeChatMessage(chat_message: {
        id: string,
        content: string;
        status: string;
        room_id: string;
        user_id: string;
    }): ChatMessage {
        let message = new ChatMessage(
            chat_message.id,
            chat_message.content,
            chat_message.status,
            chat_message.room_id,
            chat_message.user_id,
        );
        return message;
    };
}
