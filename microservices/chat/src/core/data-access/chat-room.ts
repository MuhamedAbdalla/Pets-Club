import { db_const } from "../../config";
import chatRoom from "../entities/chat-room/chat-room";
import { IChatRoom } from "../usecases/chat-room/chat-room-interface";
import { db } from "./admin";
import { IChatRoomException } from "./exception/exception-interface";

export default class ChatRoom implements IChatRoom {
    constructor(private _chat_room_exception: IChatRoomException) {}

    async insert(chat_room: chatRoom): Promise<boolean> {
        try {
            await db
                .collection(db_const.CHAT_ROOM_COLLECTION_ENTRY)
                .doc(chat_room.first_id)
                .collection(db_const.CHAT_ROOM_COLLECTION_ENTRY)
                .doc(chat_room.id)
                .set(chat_room.toJson());

            return true;
        } catch (error) {
            this._chat_room_exception.insert(error);
        }
        return false;
    }

    async update(chat_room: chatRoom): Promise<boolean> {
        try {
            await db
                .collection(db_const.CHAT_ROOM_COLLECTION_ENTRY)
                .doc(chat_room.first_id)
                .collection(db_const.CHAT_ROOM_COLLECTION_ENTRY)
                .doc(chat_room.id)
                .update(chat_room.toJson());

            return true;
        } catch (error) {
            this._chat_room_exception.update(error);
        }
        return false;
    }
    async updateRoom(chat_room: string[]): Promise<boolean> {
        try {
            let data = await db
            .collection(db_const.CHAT_ROOM_COLLECTION_ENTRY)
            .doc(chat_room[0])
            .collection(db_const.CHAT_ROOM_COLLECTION_ENTRY)
            .doc(chat_room[1])
            .update({
                LAST_MESSAEG_ID: chat_room[2],
            });

            return true;
        }
        catch (error) {
            this._chat_room_exception.updateRoom(error);
        }
        return false;
    }
    async get(user_id: string, last_room_id: string): Promise<chatRoom[]> {
        try {
            let data: any;

            if (!last_room_id.length) {
                data = await db
                    .collection(db_const.CHAT_ROOM_COLLECTION_ENTRY)
                    .doc(user_id)
                    .collection(db_const.CHAT_ROOM_COLLECTION_ENTRY)
                    .orderBy(db_const.CHAT_ROOM_LAST_MESSAGE_ID_ENTRY, "desc")
                    .limit(db_const.LIMIT)
                    .get();
            } else {
                let snap_shot = await db
                    .collection(db_const.CHAT_ROOM_COLLECTION_ENTRY)
                    .doc(user_id)
                    .collection(db_const.CHAT_ROOM_COLLECTION_ENTRY)
                    .doc(last_room_id)
                    .get();
                data = await db
                    .collection(db_const.CHAT_ROOM_COLLECTION_ENTRY)
                    .doc(user_id)
                    .collection(db_const.CHAT_ROOM_COLLECTION_ENTRY)
                    .orderBy(db_const.CHAT_ROOM_LAST_MESSAGE_ID_ENTRY, "desc")
                    .startAfter(snap_shot)
                    .limit(db_const.LIMIT)
                    .get();
            }
            let lst_room = Array<chatRoom>();

            data.docs.forEach((room) => {
                let value = room.data();
                lst_room.push(this.fromJson(value));
            });
            return lst_room;
        } catch (error) {
            this._chat_room_exception.insert(error);
        }
        return [];
    }

    fromJson = (data: {}) => {
        let chat_room = new chatRoom(
            data[db_const.CHAT_ROOM_ID_ENTRY],
            data[db_const.CHAT_ROOM_FIRST_ID_ENTRY],
            data[db_const.CHAT_ROOM_SECOND_ID_ENTRY],
            data[db_const.CHAT_ROOM_LAST_MESSAGE_ID_ENTRY],
            data[db_const.CHAT_ROOM_STATUS_ENTRY]
        );
        return chat_room;
    };
}
