import ChatRoom from "../../data-access/chat-room";
import chatRoom from '../../entities/chat-room/chat-room';

export default function makeGetRoom(room_db: ChatRoom) {
    return async function getRoom(
        user_id: string,
        last_room_id: string,
    ): Promise<chatRoom[]> {
        let lst_room = await room_db.get(user_id, last_room_id);
        return lst_room;
    };
}
