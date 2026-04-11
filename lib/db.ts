import { prisma } from './prisma';
import { User, Item } from './types';







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
export async function putItem(userId: string, itemName: string, quantity: number, expiresAt?: Date, categoryId: string) {
    return prisma.item.create({
        data: {
            userId: userId,
            name: itemName,
            quantity: quantity,
            expiresAt: expiresAt,
            categoryId: categoryId

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