import { test_const } from "../../config";
import { imageManager } from "../data-access";

describe("Testing Image uploader", () => {
    it("Test Image Operation", async () => {
        let path = test_const.FILE_NAME;
        let destination = 'images/XX/panda.jpg';

        const url = await imageManager.uploadPublicFile(path, destination);
        expect(url.length).toBeGreaterThan(0);

        const flag = await imageManager.delete(destination);
        expect(flag).toBe(true);
    });
});
