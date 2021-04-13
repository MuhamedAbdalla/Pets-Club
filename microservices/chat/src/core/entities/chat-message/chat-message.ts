import { db_const } from "../../../config";

export default class ChatMessage {
    constructor (
        private readonly _id: string,
        private readonly _content: string,
        private readonly _status: string,
        private readonly _room_id: string,
        private readonly _user_id: string,
    ) {}

    get id() : string {
        return this._id;
    }

    get content() : string {
        return this._content;
    }

    get status() : string {
        return this._status;
    }

    get room_id() : string {
        return this._room_id;
    }

    get user_id() : string {
        return this._user_id;
    }

    toJson = () => {
        let chat_message = {};
        chat_message[db_const.CHAT_MESSAGE_ID_ENTRY] = this._id;
        chat_message[db_const.CHAT_MESSAGE_CONTENT_ENTRY] = this._content;
        chat_message[db_const.CHAT_MESSAGE_STATUS_ENTRY] = this._status;
        chat_message[db_const.CHAT_MESSAGE_ROOM_ID_ENTRY] = this._room_id;
        chat_message[db_const.CHAT_MESSAGE_USER_ID_ENTRY] = this._user_id;
        return chat_message;
    }

    fromJson = (data: {}): ChatMessage => {
        let chat_message = new ChatMessage(
            data[db_const.CHAT_MESSAGE_ID_ENTRY],
            data[db_const.CHAT_MESSAGE_CONTENT_ENTRY],
            data[db_const.CHAT_MESSAGE_STATUS_ENTRY],
            data[db_const.CHAT_MESSAGE_ROOM_ID_ENTRY],
            data[db_const.CHAT_MESSAGE_USER_ID_ENTRY],
        );
        return chat_message;
    }
}