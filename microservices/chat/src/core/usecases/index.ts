import { chat_message_db, chat_room_db } from "../data-access";
import buildAddMessage from "./chat-message/add-message";
import buildUpdateMessage from "./chat-message/update-message";
import buildGetMessage from "./chat-message/get-message";
import buildAddRoom from "./chat-room/add-room";
import buildUpdateRoom from "./chat-room/update-room";
import buildGetRoom from "./chat-room/get-room";

export const add_room = buildAddRoom(chat_room_db);
export const update_room = buildUpdateRoom(chat_room_db);
export const get_room = buildGetRoom(chat_room_db);

export const add_message = buildAddMessage(chat_message_db, chat_room_db);
export const update_message = buildUpdateMessage(chat_message_db);
export const get_message = buildGetMessage(chat_message_db);
