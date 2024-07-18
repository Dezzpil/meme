import { z } from "zod";

export type bfImageDTOType = {
	id: number;
	url: string;
	createdAt: Date;
	headers: Record<string, any>;
};

export const bfImageCreateDTO = z.object({
	url: z.string().url(),
});

export type bfImageCreateDTOType = z.infer<typeof bfImageCreateDTO>;
