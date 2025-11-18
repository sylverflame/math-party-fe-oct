import z from "zod";

export const oAuthLoginResponseSchema = z.object({
  isValidUser: z.boolean(),
  user: z.object({
    email: z.email(),
    userId: z.string(),
    country: z.string().max(3),
  }),
  accessToken: z.string(),
});