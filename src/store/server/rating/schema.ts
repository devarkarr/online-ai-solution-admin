import { z } from "zod";
import getApiDetailResponseSchema from "../common/getApiDetailResponseSchema";

const Rating = z.object({
  id: z.string(),
  ratedBy: z.string(),
  feedback: z.string(),
  rate: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const RatingSchema = getApiDetailResponseSchema(z.array(Rating));
