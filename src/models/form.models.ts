import { z } from "zod";
export const schema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  description: z.string().min(1, "La descripción es obligatoria"),
  price: z.number().min(0, "El precio debe ser mayor o igual a 0"),
  brand: z.string().min(1, "La marca es obligatoria"),
  details: z.array(
    z.object({
      size: z.string().min(1, "La talla es obligatoria"),
      stock: z.number().min(0, "El stock debe ser mayor o igual a 0"),
    }),
  ),
});

export type FormValues = z.infer<typeof schema>;
