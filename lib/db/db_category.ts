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

/**
 * 
 * @param categoryId 
 * @returns seconcaryCategory
 * @description Item の categoryId からカテゴリー（小分類）を取得する。
 * @example const category = await getCategoryById();
 */
export async function getCategoryById(categoryId: string): Promise<{secondaryCategory: string} | null> {
    return await prisma.category.findFirst({
        where: {
            id: categoryId,
        },
        select: {
            secondaryCategory: true,
        }
    });
}