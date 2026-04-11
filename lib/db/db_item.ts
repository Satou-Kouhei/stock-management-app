import { prisma } from '../prisma';
import { Item } from '../types';

/**
 * 
 * @param userId 
 * @returns Item[]
 * @description ユーザIDからユーザーに紐づくアイテムを全件取得する。
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
 * @param categoryId
 * @param expiresAt 省略可能
 * @description アイテムを1件登録する。
 * @example
 * await purItem(...);
 */
export async function putItem(userId: string, itemName: string, quantity: number, categoryId: string, expiresAt?: Date) {
    return prisma.item.create({
        data: {
            userId: userId,
            name: itemName,
            quantity: quantity,
            categoryId: categoryId,
            expiresAt: expiresAt,

        },
    })
}

/**
 * 
 * @param itemId 
 * @param newFlg 
 * @description アイテムIDと削除フラグを受け取って、論理削除の有効/無効を更新する
 * @example await deleteItem(...)
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