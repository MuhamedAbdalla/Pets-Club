import { add_room, get_room, update_room } from ".";
import { add_message, update_message, get_message } from ".";

describe("Testing Chat Operations", () => {
    it("Test Chat Room", async () => {
        let r1 = await add_room("f", "s", "12", "OPENED");
        let r2 = await add_room("ff", "s", "24", "OPENED");
        let op = r1 && r2;

        expect(op).toBe(true);

        let rooms = await get_room("s", "");

        expect(rooms.length).toBe(2);

        rooms = await get_room("s", rooms[0].id);

        expect(rooms.length).toBe(1);

        rooms = await get_room("s", "");

        expect(rooms.length).toBe(2);

        r1 = await update_room(
            rooms[0].id,
            rooms[0].first_id,
            rooms[0].second_id,
            rooms[0].last_message_id,
            "CLOSED"
        );
        r2 = await update_room(
            rooms[1].id,
            rooms[1].second_id,
            rooms[1].first_id,
            rooms[1].last_message_id,
            "CLOSED"
        );

        expect(r1 && r2).toBe(true);

        rooms = await get_room("s", "");

        expect(rooms.length).toBe(2);
        expect(rooms[0].status).toBe("CLOSED");
        expect(rooms[1].status).toBe("CLOSED");

        r1 = await update_room(
            rooms[0].id,
            rooms[0].first_id,
            rooms[0].second_id,
            rooms[0].last_message_id,
            "OPENED"
        );
        r2 = await update_room(
            rooms[1].id,
            rooms[1].second_id,
            rooms[1].first_id,
            rooms[1].last_message_id,
            "OPENED"
        );

        expect(r1 && r2).toBe(true);

        rooms = await get_room("s", "");

        expect(rooms.length).toBe(2);
        expect(rooms[0].status).toBe("OPENED");
        expect(rooms[1].status).toBe("OPENED");
    });

    it("Test Chat Message", async () => {
        let rooms = await get_room("s", "");

        expect(rooms.length).toBe(2);

        let m1 = await add_message("Hi!", "SENT", rooms[0].id, rooms[0].first_id, rooms[0].second_id);
        let m2 = await add_message("HI!", "SENT", rooms[0].id, rooms[0].second_id, rooms[0].first_id);
        let m3 = await add_message("Good!", "SENT", rooms[0].id, rooms[0].first_id, rooms[0].second_id);
        
        expect(m1 && m2 && m3).toBe(true);

        let msgs = await get_message(rooms[0].id, "");

        expect(msgs.length).toBe(3);

        msgs = await get_message(rooms[0].id, msgs[0].id);

        expect(msgs.length).toBe(2);

        msgs = await get_message(rooms[0].id, "");

        expect(msgs.length).toBe(3);

        rooms = await get_room("s", "");

        expect(rooms.length).toBe(2);
        expect(rooms[0].last_message_id).toBe(msgs[2].id);

        m2 = await update_message(
            msgs[1].id,
            msgs[1].content,
            "UNSENT",
            msgs[1].room_id,
            msgs[1].user_id
        );

        expect(m2).toBe(true);

        msgs = await get_message(rooms[0].id, "");

        expect(msgs.length).toBe(3);
        expect(msgs[0].status).toBe("SENT");
        expect(msgs[1].status).toBe("UNSENT");
        expect(msgs[2].status).toBe("SENT");
    });
});
