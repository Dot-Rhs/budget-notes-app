import { z } from "zod/v4";

const noteZSchema = z.strictObject({
  title: z.string().trim().min(1).max(200),
  content: z
    .string()
    .refine((val) => val.trim().length > 0, {
      message: "Content cannot be empty",
    })
    .and(
      z
        .string()
        .max(10000, { message: "Content cannot exceed 10000 characters bab" }),
    ),
});

export const validateNote = (req, res, next) => {
  //   if (typeof req.body !== "object" || req.body === null) {
  //     return res.status(400).json({ message: "Invalid request body" });
  //   }

  //   const { title, content } = req.body;

  //   const allowedFields = ["title", "content"];

  //   const fieldCheckFailed = Object.keys(req.body).some(
  //     (key) => !allowedFields.includes(key),
  //   );

  //   if (fieldCheckFailed) {
  //     return res.status(400).json({ message: "Invalid fields in request body" });
  //   }

  //   if (!title || !content) {
  //     return res.status(400).json({ message: "All fields are required" });
  //   }

  //   if (typeof title !== "string" || typeof content !== "string") {
  //     return res
  //       .status(400)
  //       .json({ message: "Invalid title or content input bab" });
  //   }

  //   if (title.length > 200) {
  //     return res
  //       .status(400)
  //       .json({ message: "Title cannot exceed 200 characters bab" });
  //   }

  //   if (content.length > 10000) {
  //     return res
  //       .status(400)
  //       .json({ message: "Content cannot exceed 10000 characters bab" });
  //   }

  const validateSchema = noteZSchema.safeParse(req.body);

  if (!validateSchema.success) {
    const errors = validateSchema.error.issues.map((err) => err.message);

    return res.status(400).json({ message: "Note validation failed", errors });
  }

  req.body = validateSchema.data;
  next();
};
