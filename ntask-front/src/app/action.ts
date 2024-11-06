"use server";

import { z } from "zod";

const LoginSchema = z.object({
   email: z.string().email({ message: "Please enter a valid email." }).trim(),
   /* password: z
      .string()
      .min(8, { message: "Be at least 8 characters long" })
      .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
      .regex(/[0-9]/, { message: "Contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
         message: "Contain at least one special character.",
      })
      .trim(), */
});

interface FormState {
   errors?: {
      name?: string[];
      email?: string[];
      password?: string[];
   };
   message?: string;
}

export const login = async (state: FormState | undefined, formData: FormData) => {
   const validatedFields = LoginSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
   });

   if (!validatedFields.success) {
      return {
         errors: validatedFields.error.flatten().fieldErrors,
      };
   }

   await new Promise((res) => setTimeout(res, 1000));

   return {
      message: "Logado com sucesso",
   };
};
