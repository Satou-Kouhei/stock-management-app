import { createUser, getUser } from '@/lib/db';
import { createSession, encrypt } from '@/lib/session';
import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
    'use server'

    const username = formData.get("username")?.toString();
    const userpass = formData.get("userpass")?.toString();
    if(!username || !userpass) return;

    const user = await getUser(username, userpass);
    if(!user) return;

    // 不正ログイン時（ハッシュ化未実装）
    if(userpass !== user.password) return;

    // JWTを作成して、Cookieに登録
    const userId: string = user.id;
    const expiresAt: Date = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const jwt: string = await encrypt({ userId, expiresAt} );
    await createSession(expiresAt, jwt);

    redirect("/dashboard");
}

export async function registerAction(formData: FormData) {
    'use server'

    const username = formData.get("username")?.toString();
    const userpass = formData.get("userpass")?.toString();
    const confirm = formData.get("userpass-confirm")?.toString();
    if(!username || !userpass || !confirm) return;
    if(userpass !== confirm) return;

    // 一致するユーザー情報があれば return
    const user = await getUser(username, userpass);
    if(user) return;

    // ユーザー登録処理
    const newUser = await createUser(username, userpass);
    if(!newUser) return;

    // JWTを作成して、Cookieに登録
    const userId: string = newUser.id;
    const expiresAt: Date = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const jwt: string = await encrypt({ userId, expiresAt} );
    await createSession(expiresAt, jwt);

    redirect("/dashboard");
}