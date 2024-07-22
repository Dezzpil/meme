import axios from "axios";
import { createWriteStream } from "node:fs";
import { PassThrough } from "node:stream";
import { pipeline } from "node:stream/promises";

type InputProps = {
	id: number;
	url: string;
	maxBytes: number;
	timeOut: number;
};
type OutputProps = {
	filePath: string;
};
export default async function download(input: InputProps, output: OutputProps) {
	const response = await axios.get(input.url, {
		responseType: "stream",
		signal: AbortSignal.timeout(input.timeOut),
	});

	let bytes = 0;
	const pass = new PassThrough();
	pass.on("data", (chunk: Buffer) => {
		bytes += Buffer.byteLength(chunk, "binary");
		if (bytes > input.maxBytes) {
			pass.destroy(
				new Error(
					`limit of maxBytes (${input.maxBytes}) has been reached while downloading image with id ${input.id}`,
				),
			);
		}
	});

	await pipeline(response.data, pass, createWriteStream(output.filePath));
	return bytes;
}
