import ChatRoom from "./chat-room";

export function buildMakeChatRoom() {
    return function makeChatRoom(chat_room: {
        id: string,
        first_id: string;
        second_id: string;
        last_message_id: string;
        status: string;
    }): ChatRoom {
        let room = new ChatRoom(
            chat_room.id,
            chat_room.first_id,
            chat_room.second_id,
            chat_room.last_message_id,
            chat_room.status
        );
        return room;
    };
}
