import z from "zod";

const UserSchema = z.object({
  userId: z.string().nullable(),
  id: z.number().nullable(),
  picture: z.string().optional(),
  name: z.string().optional(),
  country: z.string().max(3).optional().nullable(),
});

export const oAuthLoginResponseSchema = z.object({
  isValidUser: z.boolean(),
  user: UserSchema,
  accessToken: z.string(),
});

export type User = z.infer<typeof UserSchema>;
