import { createUser, getUserByName, userExists } from '@/lib/db';
import { createSession, encrypt } from '@/lib/session';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';

/**
 * 
 * @param formData 
 * @example
 * <form action={loginAction}>
 * 
 */
export async function loginAction(formData: FormData) {
    'use server'

    const username = formData.get("username")?.toString();
    const userpass = formData.get("userpass")?.toString();
    if(!username || !userpass) return;

    const user = await getUserByName(username);
    if(!user) return;

    // パスワードを検証
    const isValid = await bcrypt.compare(userpass.trim(), user.password);
    if(!isValid) return;

    // JWTを作成して、Cookieに登録
    const userId: string = user.id;
    const expiresAt: Date = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const jwt: string = await encrypt({ userId, expiresAt} );
    await createSession(expiresAt, jwt);

    redirect("/dashboard");
}

/**
 * 
 * @param formData 
 * @example
 * <form action={registerAction}
 */
export async function registerAction(formData: FormData) {
    'use server'

    const username = formData.get("username")?.toString();
    const userpass = formData.get("userpass")?.toString();
    const confirm = formData.get("userpass-confirm")?.toString();
    if(!username || !userpass || !confirm) return;
    if(userpass !== confirm) return;

    // 一致するユーザー情報があれば return
    const user = await userExists(username);
    if(user) return;

    // ユーザー登録処理
    const hashedPassword = await bcrypt.hash(userpass.trim(), 12);
    const newUser = await createUser(username, hashedPassword);
    if(!newUser) return;

    // JWTを作成して、Cookieに登録
    const userId: string = newUser.id;
    const expiresAt: Date = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const jwt: string = await encrypt({ userId, expiresAt} );
    await createSession(expiresAt, jwt);

    redirect("/dashboard");
}