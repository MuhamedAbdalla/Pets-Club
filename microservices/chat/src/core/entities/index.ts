import { buildMakeChatMessage } from "./chat-message/chat-message-factory";
import { buildMakeChatRoom } from "./chat-room/chat-room-factory";

export const chat_room = buildMakeChatRoom();
export const chat_message = buildMakeChatMessage();