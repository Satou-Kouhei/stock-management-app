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
        .setExpirationTime("30m")
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
        sameSite: "strict",
        path: "/"
    })
}

export async function getUserIdBySession() {
    // クッキーからJWTを取得
    const cookieStore = await cookies();
    const session = cookieStore.get("session");
    if(!session) return "";

    const jwt = session.value;
    const token = await decrypt(jwt);
    if(!token) return "";

    return token.userId as string;
}

export async function deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete("session");
}