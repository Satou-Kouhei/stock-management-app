import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { SessionPayload } from './types';
import { cookies } from 'next/headers';

const secretKey = process.env.SESSION_SECRET;
const encodeKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(encodeKey);
}

export async function decrypt(session: string | undefined = "") {
    try {
        const { payload } = await jwtVerify(session, encodeKey, {
            algorithms: ["HS256"],
        });
        return payload;
    } catch (error) {
        console.log("セッションの検証に失敗しました。");
    }
}

export async function createSession(expiresAt: Date, jwt: string) {
    
    const cookieStore = await cookies();

    cookieStore.set("session", jwt, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: true,
        path: "/"
    })
}