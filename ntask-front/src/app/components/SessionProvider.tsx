"use client";

import { createContext } from "react";
import { SessionPayload } from "../action";

interface SessionContextProps {
   session: SessionPayload | null;
}

export const SessionContext = createContext({} as SessionContextProps);

interface SessionProviderProps {
   children: React.ReactNode;
   session: SessionPayload | null;
}

export default function SessionProvider({ children, session }: SessionProviderProps) {
   return (
      <SessionContext.Provider
         value={{
            session,
         }}
      >
         {children}
      </SessionContext.Provider>
   );
}
