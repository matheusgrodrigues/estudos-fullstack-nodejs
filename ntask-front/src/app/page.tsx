"use client";

import { useActionState } from "react";

import { login } from "./action";

export default function Home() {
   const [state, formAction, isPending] = useActionState(login, undefined);

   console.log(state);

   return (
      <div>
         <h1>Login</h1>

         <form action={formAction}>
            <input type="text" name="email" />
            <p>{state?.errors?.email}</p>

            <input type="password" name="senha" />

            <p>{state?.message}</p>
            <button type="submit" disabled={isPending} className={`${isPending ? "opacity-50" : ""}`}>
               Entrar
            </button>
         </form>
      </div>
   );
}
