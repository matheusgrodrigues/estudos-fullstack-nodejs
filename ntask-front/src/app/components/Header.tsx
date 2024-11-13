"use client";

import Button from "./Button";

interface HeaderProps {
   logout: () => Promise<void>;
}

export default function Header({ logout }: HeaderProps) {
   const handleLogout = async () => {
      const action = confirm("Tem certeza que deseja sair?");

      // TODO: verificar o porque está disparando sempre o Error, mesmo funcionando a função.
      if (action) {
         try {
            await logout();
         } catch (error) {
            throw new Error("Erro ao fazer logout", error as ErrorOptions | undefined);
         }
      }
   };

   return (
      <header className="flex justify-between items-center px-5 h-16 bg-slate-800">
         <h1 className="text-white">NTASK</h1>
         <Button onClick={handleLogout}>Logout</Button>
      </header>
   );
}
