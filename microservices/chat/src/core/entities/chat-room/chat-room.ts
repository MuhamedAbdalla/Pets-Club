import { db_const } from "../../../config";

export default class ChatRoom {
    constructor (
        private readonly _id: string,
        private readonly _first_id: string,
        private readonly _second_id: string,
        private readonly _last_message_id: string,
        private readonly _status: string,
    ) {}

    get id() : string {
        return this._id;
    }

    get first_id() : string {
        return this._first_id;
    }

    get second_id() : string {
        return this._second_id;
    }

    get last_message_id() : string {
        return this._last_message_id;
    }

    get status() : string {
        return this._status;
    }

    toJson = () => {
        let chat_room = {};

        chat_room[db_const.CHAT_ROOM_ID_ENTRY] = this._id;
        chat_room[db_const.CHAT_ROOM_FIRST_ID_ENTRY] = this._first_id;
        chat_room[db_const.CHAT_ROOM_SECOND_ID_ENTRY] = this._second_id;
        chat_room[db_const.CHAT_ROOM_LAST_MESSAGE_ID_ENTRY] = this._last_message_id;
        chat_room[db_const.CHAT_ROOM_STATUS_ENTRY] = this._status;
        return chat_room;
    }

    fromJson = (data: {}) => {
        let chat_room = new ChatRoom(
            data[db_const.CHAT_ROOM_ID_ENTRY],
            data[db_const.CHAT_ROOM_FIRST_ID_ENTRY],
            data[db_const.CHAT_ROOM_SECOND_ID_ENTRY],
            data[db_const.CHAT_ROOM_LAST_MESSAGE_ID_ENTRY],
            data[db_const.CHAT_ROOM_STATUS_ENTRY],
        );
        return chat_room;
    }
}