import download from "./download";
import { join } from "node:path";
import { equal, match } from "node:assert";
import { describe, it } from "node:test";

describe.skip("should download correctly", async () => {
	await it("google logo", async () => {
		const url =
			"https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png";
		const filePath = join(__dirname, "google.png");
		const bytes = await download(
			{ id: 1, url, maxBytes: 10240, timeOut: 1000 },
			{ filePath },
		);
		equal(bytes, 5969);
	});

	await it("something from ria", async () => {
		const url =
			"https://cdnn21.img.ria.ru/images/07e8/07/12/1960552185_0:0:3071:2048_1440x900_80_0_1_4b7faaa3927581ff266d275a4b5fecf7.jpg.webp?source-sid=ap_photo";
		const filePath = join(__dirname, "baiden.webp");
		const declaredBytes = 25568;
		const bytes = await download(
			{ id: 1, url, maxBytes: declaredBytes + 100, timeOut: 1000 },
			{ filePath },
		);
		equal(bytes, declaredBytes);
	});
});

describe("should not download because errors", async () => {
	await it("google logo", async () => {
		const url =
			"https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png";
		const filePath = join(__dirname, "google.png");
		try {
			await download(
				{ id: 1, url, maxBytes: 500, timeOut: 1000 },
				{ filePath },
			);
			throw new Error("must throw error");
		} catch (e: any) {
			match(e.message, /maxBytes/);
		}
	});
	await it("something from ria", async () => {
		const url =
			"https://cdnn21.img.ria.ru/images/07e8/07/12/1960552185_0:0:3071:2048_1440x900_80_0_1_4b7faaa3927581ff266d275a4b5fecf7.jpg.webp?source-sid=ap_photo";
		const filePath = join(__dirname, "baiden.webp");
		const declaredBytes = 25568;
		try {
			await download(
				{ id: 1, url, maxBytes: declaredBytes + 100, timeOut: 10 },
				{ filePath },
			);
			throw new Error(`must throw error`);
		} catch (e: any) {
			match(e.message, /canceled/);
		}
	});
});
