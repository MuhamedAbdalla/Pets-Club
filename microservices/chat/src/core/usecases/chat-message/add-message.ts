import ChatMessage from "../../data-access/chat-message";
import { chat_message, chat_room } from "../../entities";
import * as uuid from 'uuid';
import ChatRoom from "../../data-access/chat-room";
import { service_const } from "../../../config";

export default function makeAddMessage(message_db: ChatMessage, room_db: ChatRoom) {
    return async function addMessage(
        content: string,
        status: string,
        room_id: string,
        user_id: string,
        tuser_id: string,
    ): Promise<boolean> {
        let id = new Date().toString() + service_const.KEY_ID + uuid.v4();
        let message = chat_message({
            id,
            content,
            status,
            room_id,
            user_id,
        });
        let room1 = [user_id, room_id, id];
        let room2 = [tuser_id, room_id, id];
        let msg = await message_db.insert(message);
        let cur_room1 = await room_db.updateRoom(room1);
        let cur_room2 = await room_db.updateRoom(room2);
        return (msg && cur_room1 && cur_room2);
    };
}
