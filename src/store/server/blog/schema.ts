import { z } from "zod";
import getApiDetailResponseSchema from "../common/getApiDetailResponseSchema";

const blogSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  body: z.string(),
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

export const BlogSchema = getApiDetailResponseSchema(z.array(blogSchema));
