import ChatMessage from "./chat-message";
import ChatRoom from "./chat-room";
import {
    ChatMessageException,
    ChatRoomException,
    IImageException,
} from "./exception/exception-imp";
import IImageManager from "./image";

export const imageManager = new IImageManager(new IImageException());
export const chat_message_db = new ChatMessage(new ChatMessageException());
export const chat_room_db = new ChatRoom(new ChatRoomException());
