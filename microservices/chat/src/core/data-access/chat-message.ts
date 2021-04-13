import { db_const } from "../../config";
import chatMessage from "../entities/chat-message/chat-message";
import { IChatMessage } from "../usecases/chat-message/chat-message-interface";
import { db } from "./admin";
import { IChatMessageException } from "./exception/exception-interface";

export default class ChatMessage implements IChatMessage {
    constructor(
        private _chat_message_exception: IChatMessageException,
    ) {}
    async insert(chat_message: chatMessage): Promise<boolean> {
        try {
            await db
            .collection(db_const.CHAT_MESSAGE_COLLECTION_ENTRY)
            .doc(chat_message.room_id)
            .collection(db_const.CHAT_MESSAGE_COLLECTION_ENTRY)
            .doc(chat_message.id)
            .set(chat_message.toJson());
            return true;
        }
        catch (error) {
            this._chat_message_exception.insert(error);
        }
        return false;
    }
    async update(chat_message: chatMessage): Promise<boolean> {
        try {
            await db
            .collection(db_const.CHAT_MESSAGE_COLLECTION_ENTRY)
            .doc(chat_message.room_id)
            .collection(db_const.CHAT_MESSAGE_COLLECTION_ENTRY)
            .doc(chat_message.id)
            .update(chat_message.toJson());
            return true;
        }
        catch (error) {
            this._chat_message_exception.update(error);
        }
        return false;
    }
    async get(room_id: string, last_message_id: string): Promise<chatMessage[]> {
        try {
            let data: any;

            if (!last_message_id.length) {
                data = await db
                .collection(db_const.CHAT_MESSAGE_COLLECTION_ENTRY)
                .doc(room_id)
                .collection(db_const.CHAT_MESSAGE_COLLECTION_ENTRY)
                .orderBy(db_const.CHAT_MESSAGE_ID_ENTRY)
                .limit(db_const.LIMIT)
                .get();
            }
            else {
                data = await db
                .collection(db_const.CHAT_MESSAGE_COLLECTION_ENTRY)
                .doc(room_id)
                .collection(db_const.CHAT_MESSAGE_COLLECTION_ENTRY)
                .orderBy(db_const.CHAT_MESSAGE_ID_ENTRY)
                .startAfter(last_message_id)
                .limit(db_const.LIMIT)
                .get();
            }
            let lst_messages = Array<chatMessage>();
            
            data.docs.forEach(message => {
                let value = message.data();
                lst_messages.push(
                    this.fromJson(value),
                );
            });
            return lst_messages;
        }
        catch (error) {
            this._chat_message_exception.get(error);
        }
        return [];
    }

    fromJson = (data: {}): chatMessage => {
        let chat_message = new chatMessage(
            data[db_const.CHAT_MESSAGE_ID_ENTRY],
            data[db_const.CHAT_MESSAGE_CONTENT_ENTRY],
            data[db_const.CHAT_MESSAGE_STATUS_ENTRY],
            data[db_const.CHAT_MESSAGE_ROOM_ID_ENTRY],
            data[db_const.CHAT_MESSAGE_USER_ID_ENTRY],
        );
        return chat_message;
    }
}