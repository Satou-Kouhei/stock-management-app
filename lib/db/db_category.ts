import { prisma } from '../prisma';
import type { Category } from '../types';

/**
 * 
 * @returns Category[]
 * @description カテゴリー情報をすべて取得する。
 * @example const primary = await getAllCategory();
 * 
 */
export async function getAllCategory(): Promise<Category[]> {
    return await prisma.category.findMany({
        select: {
            id: true,
            primaryCategory: true,
            secondaryCategory: true
        }
    });
}