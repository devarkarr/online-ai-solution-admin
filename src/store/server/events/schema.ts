import { z } from "zod";
import getApiDetailResponseSchema from "../common/getApiDetailResponseSchema";

const eventSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  detail: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  status: z.enum(["ONGOING", "UPCOMING", "PREVIOUS"]),
  organization: z.string(),
  createdById: z.string().uuid(),
  isDeleted: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  files: z.array(
    z.object({
      path: z.string().url(),
    })
  ),
});

export const EventSchema = getApiDetailResponseSchema(z.array(eventSchema));
