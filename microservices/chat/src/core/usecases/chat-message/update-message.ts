import ChatMessage from "../../data-access/chat-message";
import { chat_message } from "../../entities";

export default function makeUpdateMessage(message_db: ChatMessage) {
    return async function updateMessage(
        id: string,
        content: string,
        status: string,
        room_id: string,
        user_id: string,
    ): Promise<boolean> {
        let message = chat_message({
            id,
            content,
            status,
            room_id,
            user_id,
        });
        return await message_db.update(message);
    };
}
