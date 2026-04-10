import { prisma } from './prisma';
import { User, Item } from './types';

/**
 * 
 * @param name 
 * @returns 存在する場合は true、 存在しない場合は false を返す。
 * @example
 * // ユーザー名から、同名ユーザーの存在確認をする。
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
 * @returns ユーザー名からユーザー情報を取得する。
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
 * @example
 * // ユーザーを新規登録する。
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

/**
 * 
 * @param userId 
 * @returns ユーザーIDからユーザーに紐づく品目を取得する。
 * @example
 * const items[] | null = await getItem(userId);
 */
export async function getItems(userId: string): Promise<Item[] | null> {
    return await prisma.item.findMany({
        where: {
            userId: userId,
        },
        orderBy: {
            createAt: "desc",
        }
    });
}

/**
 * 
 * @param userId 
 * @param itemName 
 * @param quantity 
 * @param expiresAt 
 * @example
 * // 品目を登録する
 * await purItem(...);
 */
export async function putItem(userId: string, itemName: string, quantity: number, expiresAt?: Date) {
    return prisma.item.create({
        data: {
            userId: userId,
            name: itemName,
            quantity: quantity,
            expiresAt: expiresAt,
        },
    })
}

/**
 * 
 * @param itemId 
 * @param newFlg 
 * @description
 * アイテムIDと削除フラグを受け取って、論理削除の有効/無効を更新する
 */
export async function deleteItem(itemId: string, newFlg: boolean) {
    return prisma.item.update({
        where: {
            id: itemId,
        },
        data: {
            deleteFlg: newFlg,
        }
    });
}