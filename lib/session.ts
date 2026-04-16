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

export async function decrypt(session: string | undefined) {
    if(!session) return null;
    try {
        const { payload } = await jwtVerify(session, encodeKey, {
            algorithms: ["HS256"],
        });
        return payload;
    } catch (error: any) {
        if(error.name === "JWTExpired") {
            console.log("セッションの有効期限が切れています。");
        } else {
            console.log("セッションの検証に失敗しました。");
        }
        return null;
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

export async function updateSession() {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;

    if(!session) return;

    const payload = await decrypt(session);

    if(!payload) return;

    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

    cookieStore.set("session", session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: "strict",
        path: "/"
    })
}

export async function getSession() {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value

    return session;
}
