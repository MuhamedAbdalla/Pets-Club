import ChatMessage from "../../data-access/chat-message";
import chatMessage from '../../entities/chat-message/chat-message';

export default function makeGetMessage(message_db: ChatMessage) {
    return async function getMessage(
        room_id: string,
        last_message_id: string,
    ): Promise<chatMessage[]> {
        let lst_messages = await message_db.get(room_id, last_message_id);
        return lst_messages;
    };
}
