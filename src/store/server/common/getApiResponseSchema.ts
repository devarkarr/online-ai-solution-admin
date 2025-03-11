import { z } from "zod";

export default function getApiResponseSchema<DataType extends z.ZodTypeAny>(
  dataSchema: DataType
) {
  return z.object({
    _metadata: z.object({
      statusCode: z.number(),
      message: z.string(),
    }),
    _data: dataSchema,
  });
}
