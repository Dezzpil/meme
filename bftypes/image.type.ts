import { z } from 'zod';

export const BFImgCreateDTO = z.object({
  url: z.string().url(),
});

export type BFImgCreateDTOType = z.infer<typeof BFImgCreateDTO>;
