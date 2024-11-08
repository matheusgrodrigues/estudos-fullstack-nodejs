import { SignJWT, jwtVerify, JWTPayload } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

interface User {
   email: string | null;
   name: string;
}

interface SessionPayload extends JWTPayload {
   user: User;
   expires: Date;
}

export async function encrypt(payload: SessionPayload): Promise<string> {
   return await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(encodedKey);
}

export async function decrypt(input: string): Promise<SessionPayload | null> {
   try {
      const { payload } = await jwtVerify(input, encodedKey, {
         algorithms: ["HS256"],
      });
      return payload as SessionPayload;
   } catch {
      return null;
   }
}

export async function login(formData: FormData): Promise<void> {
   const user: User = { email: formData.get("email") as string, name: "Matheus" };

   const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
   const session = await encrypt({ user, expires });

   const cookiesInstance = await cookies();

   cookiesInstance.set("session", session, {
      httpOnly: true,
      secure: true,
      expires,
      sameSite: "lax",
      path: "/",
   });
}

export async function logout(): Promise<void> {
   const cookiesInstance = await cookies();
   cookiesInstance.delete("session");
}

export async function getSession(): Promise<SessionPayload | null> {
   const cookiesInstance = await cookies();
   const session = cookiesInstance.get("session")?.value;
   if (!session) return null;
   return await decrypt(session);
}

export async function updateSession(request: NextRequest): Promise<NextResponse | undefined> {
   const cookiesInstance = await cookies();

   const session = request.cookies.get("session")?.value;
   const payload = await decrypt(session!);

   if (!session || !payload) return;

   const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

   cookiesInstance.set("session", session, {
      httpOnly: true,
      secure: true,
      expires: expires,
      sameSite: "lax",
      path: "/",
   });
}
