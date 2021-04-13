import ChatRoom from "../../entities/chat-room/chat-room";

export interface IChatRoom {
    insert(chat_room: ChatRoom): Promise<boolean>;
    update(chat_room: ChatRoom): Promise<boolean>;
    updateRoom(chat_room: string[]): Promise<boolean>;
    get(user_id: string, last_room_id: string): Promise<ChatRoom[]>;
}
