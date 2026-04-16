import { NextResponse, NextRequest } from 'next/server';
import { decrypt, deleteSession, getSession, updateSession } from './lib/session';

export async function proxy(request: NextRequest) {
    // 遷移先ページの確認
    const pathname = request.nextUrl.pathname;
    const targetPath = ["/dashboard", "/list"];
    if(!targetPath.includes(pathname)) {
        return NextResponse.next();
    }

    // session有無の確認
    const session = await getSession();
    if(!session) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    
    // sessionがあるとき、ペイロードにする。
    const payload = await decrypt(session);

    if(!payload) {
        // session 無効
        await deleteSession();
        return NextResponse.redirect(new URL('/login', request.url));
    } else {
        // session 有効
        await updateSession();
        return NextResponse.next();
    }
}

export const config = {
    matcher: ["/dashboard", "/list"],
}