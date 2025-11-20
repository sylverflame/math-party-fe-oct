import z from "zod";

export const oAuthLoginResponseSchema = z.object({
  isValidUser: z.boolean(),
  user: z.object({
    userId: z.string(),
    id: z.number(),
    country: z.string().max(3).optional(),
  }),
  accessToken: z.string(),
});