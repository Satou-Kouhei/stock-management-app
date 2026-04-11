import { prisma } from '../prisma';
import { User } from '../types';

/**
 * 
 * @param name 
 * @returns 存在する場合は true、 存在しない場合は false を返す。
 * @description ユーザー名から、同名ユーザーの存在確認をする。
 * @example
 * const user = await userExist(username);
 */
export async function userExists(name: string): Promise<boolean> {
    const count = await prisma.user.count({
        where: {
            name: name.trim(),
        }
    });
    
    return count > 0;
}

/**
 * 
 * @param name 
 * @returns id, name, password
 * @description ユーザー名からユーザー情報を取得する。
 * @example const user = await getUsreByName(userName);
 */
export async function getUserByName(name: string): Promise<{id: string, name: string, password: string} | null> {
    return await prisma.user.findFirst({
        where: {
            name: name.trim(),
        },
        select: {
            id: true,
            name: true,
            password: true,
        }
    });
}

/**
 * 
 * @param username 
 * @param userpass ハッシュ化されたパスワード
 * @description ユーザーを新規登録する。
 * @example
 * const newUser = await createUser(username, userpass);
 */
export async function createUser(username: string, userpass: string): Promise<User> {
    return await prisma.user.create({
        data: {
            name: username.trim(),
            password: userpass
        }
    });
}