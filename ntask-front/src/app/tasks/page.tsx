"use client";

import { useContext } from "react";
import { SessionContext } from "../components/SessionProvider";

export default function Tasks() {
   const { session } = useContext(SessionContext);

   console.log(session);

   return <div>{session?.user.email}</div>;
}
