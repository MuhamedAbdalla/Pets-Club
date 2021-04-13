import ChatRoom from '../../data-access/chat-room';
import { chat_room } from '../../entities';

export default function makeUpdateRoom(room_db: ChatRoom) {
    return async function updateRoom(
        id: string,
        first_id: string,
        second_id: string,
        last_message_id: string,
        status: string,
    ): Promise<boolean> {
        let room = chat_room({
            id,
            first_id,
            second_id,
            last_message_id,
            status,
        });
        let room_1 = await room_db.update(room);
        let tmp = second_id;
        second_id = first_id;
        first_id = tmp;
        
        room = chat_room({
            id,
            first_id,
            second_id,
            last_message_id,
            status,
        });
        let room_2 = await room_db.update(room);
        return (room_1 && room_2);
    };
}
