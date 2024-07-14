import { z } from "zod";

export const BFImgLoadBody = z.object({
	url: z.string().url(),
});

export type BFImgLoadBodyType = z.infer<typeof BFImgLoadBody>;
