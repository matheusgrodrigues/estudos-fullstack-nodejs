import { Metadata } from "next";
import { getSession, logout } from "../action";
import { redirect } from "next/navigation";

import Header from "../components/Header";
import SessionProvider from "../components/SessionProvider";

export const metadata: Metadata = {
   title: "NTask - Tasks",
   description: "Tasks Page",
};

interface RootLayoutProps {
   children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
   const session = await getSession();

   const handleLogout = async () => {
      "use server";
      await logout();
      redirect("/");
   };

   return (
      <main>
         <SessionProvider session={session}>
            <Header logout={handleLogout} />
            {children}
         </SessionProvider>
      </main>
   );
}
