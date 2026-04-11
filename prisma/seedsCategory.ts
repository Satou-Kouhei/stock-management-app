'use server'

import { prisma } from '@/lib/prisma';

export async function seedsCategory() {
    try {

        await prisma.category.createMany({
        data: [
            // === 食品 ===
            { id: '81e5d31d-72e1-43ae-a541-2cf74866da6d', primaryCategory: '食品', secondaryCategory: '生鮮食品' },
            { id: 'c083623e-36a2-4f42-8a2b-babe6e48338c', primaryCategory: '食品', secondaryCategory: '冷凍食品' },
            { id: 'c494437f-6245-4100-a932-b87ced62aa74', primaryCategory: '食品', secondaryCategory: 'レトルト・インスタント' },
            { id: '895bedc5-c0ed-4cf7-9478-a390907c8998', primaryCategory: '食品', secondaryCategory: '調味料' },
            { id: 'd5a30848-6fe6-49b3-89a8-a1d26c251bb8', primaryCategory: '食品', secondaryCategory: '飲料・お酒' },
            { id: 'f77fcb95-580a-4f90-a618-b6d767e7c064', primaryCategory: '食品', secondaryCategory: 'お菓子' },

            // === 日用品 ===
            { id: 'b83f98a6-d20a-4bec-b6d6-62777359558e', primaryCategory: '日用品', secondaryCategory: '洗剤・クリーナー' },
            { id: '11e1e6a1-2455-4d5f-ba10-a31dd99bd6c4', primaryCategory: '日用品', secondaryCategory: 'ティッシュ・ペーパー類' },
            { id: '323aaa78-90d4-4a72-b2cc-5cb3821fca3a', primaryCategory: '日用品', secondaryCategory: 'バス・トイレ用品' },
            { id: 'e9e71980-ee43-41cc-a412-471d8cfd217a', primaryCategory: '日用品', secondaryCategory: 'キッチン消耗品' },
            { id: 'a08ac876-4d4d-47ed-ac23-0971cc41edc9', primaryCategory: '日用品', secondaryCategory: '洗濯用品' },

            // === 雑貨・その他 ===
            { id: '334258e8-3ef6-4f27-a04c-6d81b8d78149', primaryCategory: '雑貨・その他', secondaryCategory: '文房具' },
            { id: '181d1397-5d7e-4740-b4f5-9db9e77f6010', primaryCategory: '雑貨・その他', secondaryCategory: '常備薬・衛生用品' },
            { id: 'fb26643f-ffc2-421d-ac83-9c6a144f34b2', primaryCategory: '雑貨・その他', secondaryCategory: 'ペット用品' },
            { id: '83cfec98-c1d3-4d0e-a9ff-26b757cd5f92', primaryCategory: '雑貨・その他', secondaryCategory: '電池・工具' },
        ],
        });

       
        console.log('テストデータ登録完了');
        return { success: true, message: '登録しました' };
    } catch (error) {
        if (error instanceof Error){
            console.error("詳細:", error.message);
        }
  } finally {
        await prisma.$disconnect();
    }
}

seedsCategory()
    .catch((e) => {
        console.log(e.message);
        process.exit(1);
    }).finally(async () => {
        await prisma.$disconnect();
    });