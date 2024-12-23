import "server-only";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

// TODO: tipar o payload corretamente
export async function encrypt(payload: any) {
   return new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
   try {
      const { payload } = await jwtVerify(session, encodedKey, {
         algorithms: ["HS256"],
      });

      return payload;
   } catch (error) {
      console.log("Failed ot verify session");
   }
}

export async function createSession(userId: string) {
   const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
   const session = await encrypt({ userId, expiresAt });

   (await cookies()).set("session", session, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: "lax",
      path: "/",
   });
}
