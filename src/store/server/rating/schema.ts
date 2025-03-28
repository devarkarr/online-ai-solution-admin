import { z } from "zod";
import getApiDetailResponseSchema from "../common/getApiDetailResponseSchema";

const InQuery = z.object({
  id: z.string(),
  name: z.string(),
  phone: z.string(),
  email: z.string().email(),
  companyName: z.string(),
  country: z.string(),
  jobTitle: z.string(),
  jobDetail: z.string(),
  rating: z.number(),
  ratingDesc: z.string().nullish(),
  createdAt: z.string(),
  updatedAt: z.string(),
  seen: z.boolean(),
});

export const InQuerySchema = getApiDetailResponseSchema(z.array(InQuery));
