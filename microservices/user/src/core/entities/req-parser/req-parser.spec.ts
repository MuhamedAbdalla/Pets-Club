import { MissingArgument } from "./exceptions/argument";
import { ReqParser } from "./req-parser";

describe("testing parseing request", () => {
    const reqParser = new ReqParser();
    beforeAll(() => {
        reqParser.addArgument("arg1", { required: true });
        reqParser.addArgument("arg2");
        reqParser.addArgument("arg3", { type: "string" });
        reqParser.addArgument("arg4", { type: "number" });
        reqParser.addArgument("arg5", { type: "bigint" });
        reqParser.addArgument("arg6", { type: "boolean" });
    });

    it("get required argument that's already in the req", () => {
        let req: any = { body: { arg1: "test1" }, headers: {} };
        let ret: any = reqParser.parse(req);
        expect(ret.arg1).toBe(req.body.arg1);
        expect(ret.arg2).toBe(undefined);
        expect(ret.arg3).toBe(undefined);

        req = { headers: { arg1: "test1" }, body: {} };
        ret = reqParser.parse(req);
        expect(ret.arg1).toBe(req.headers.arg1);
        expect(ret.arg2).toBe(undefined);
        expect(ret.arg3).toBe(undefined);
    });

    it("get required argument that isn't in the req", () => {
        const req = { body: {}, headers: {} };
        const t = () => {
            const ret = reqParser.parse(req);
        };
        expect(t).toThrow(MissingArgument);
        expect(t).toThrow(new MissingArgument("arg1").message);
    });

    it("get an argument of type string", () => {
        const req = { body: { arg3: "test1" }, headers: { arg1: "" } };
        const ret = reqParser.parse(req);
        expect(typeof ret.arg3).toBe("string");
    });

    it("get an argument of type number", () => {
        const req = { body: { arg4: "123" }, headers: { arg1: "" } };
        const ret = reqParser.parse(req);
        expect(typeof ret.arg4).toBe("number");
        expect(ret.arg4).toBe(123);
    });

    it("get an argument of type bigint", () => {
        const req = { body: { arg5: "123444444444444" }, headers: { arg1: "" } };
        const ret = reqParser.parse(req);
        expect(typeof ret.arg5).toBe("bigint");
        expect(ret.arg5).toBe(BigInt("123444444444444"));
    });

    it("get an argument of type boolean", () => {
        let req = { body: { arg6: "true" }, headers: { arg1: "" } };
        let ret = reqParser.parse(req);
        expect(typeof ret.arg6).toBe("boolean");
        expect(ret.arg6).toBe(true);

        req = { body: { arg6: "false" }, headers: { arg1: "" } };
        ret = reqParser.parse(req);
        expect(typeof ret.arg6).toBe("boolean");
        expect(ret.arg6).toBe(false);

        req = { body: { arg6: "0" }, headers: { arg1: "" } };
        ret = reqParser.parse(req);
        expect(typeof ret.arg6).toBe("boolean");
        expect(ret.arg6).toBe(false);

        req = { body: { arg6: "" }, headers: { arg1: "" } };
        ret = reqParser.parse(req);
        expect(typeof ret.arg6).toBe("boolean");
        expect(ret.arg6).toBe(false);
    });
});
