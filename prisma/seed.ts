'use server'

import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function seed() {
    try {
        const password1 = await bcrypt.hash("satoutarou", 12);
        const user1 = await prisma.user.create({
        data: {
            name: '佐藤 太郎',
            password: password1, 
        },
        });

        const password2 = await bcrypt.hash("suzukihanako", 12);
        const user2 = await prisma.user.create({
        data: {
            name: '鈴木 花子',
            password: password2,
        },
        });

        // ユーザー1のアイテム（10件）
        await prisma.item.createMany({
        data: [
            { userId: user1.id, name: '牛乳（1L）', quantity: 2, expiresAt: new Date('2026-04-05'), categoryId: '81e5d31d-72e1-43ae-a541-2cf74866da6d' }, // 食品: 生鮮食品 (期限切れ)
            { userId: user1.id, name: '卵（10個パック）', quantity: 1, expiresAt: new Date('2026-04-12'), categoryId: '81e5d31d-72e1-43ae-a541-2cf74866da6d' }, // 食品: 生鮮食品 (まもなく期限切れ)
            { userId: user1.id, name: '食パン（6枚切り）', quantity: 2, expiresAt: new Date('2026-03-25'), categoryId: '81e5d31d-72e1-43ae-a541-2cf74866da6d' }, // 食品: 生鮮食品 (期限切れ)
            { userId: user1.id, name: 'トイレットペーパー（12ロール）', quantity: 3, expiresAt: null, categoryId: '11e1e6a1-2455-4d5f-ba10-a31dd99bd6c4' }, // 日用品: ティッシュ・ペーパー類
            { userId: user1.id, name: 'シャンプー（詰め替え）', quantity: 1, expiresAt: new Date('2027-01-01'), categoryId: '323aaa78-90d4-4a72-b2cc-5cb3821fca3a' }, // 日用品: バス・トイレ用品
            { userId: user1.id, name: 'バター（200g）', quantity: 1, expiresAt: new Date('2026-05-15'), categoryId: '81e5d31d-72e1-43ae-a541-2cf74866da6d' }, // 食品: 生鮮食品
            { userId: user1.id, name: '納豆（3パック）', quantity: 4, expiresAt: new Date('2026-03-22'), categoryId: '81e5d31d-72e1-43ae-a541-2cf74866da6d' }, // 食品: 生鮮食品 (期限切れ)
            { userId: user1.id, name: 'ティッシュペーパー（5箱）', quantity: 2, expiresAt: null, categoryId: '11e1e6a1-2455-4d5f-ba10-a31dd99bd6c4' }, // 日用品: ティッシュ・ペーパー類
            { userId: user1.id, name: '冷凍うどん（5食）', quantity: 2, expiresAt: new Date('2026-09-01'), categoryId: 'c083623e-36a2-4f42-8a2b-babe6e48338c' }, // 食品: 冷凍食品
            { userId: user1.id, name: '洗剤（液体詰め替え）', quantity: 1, expiresAt: new Date('2027-03-01'), categoryId: 'b83f98a6-d20a-4bec-b6d6-62777359558e' }, // 日用品: 洗剤・クリーナー

            // 【追加】ユーザー1の新しいアイテム（5件）
            { userId: user1.id, name: 'キャベツ（1玉）', quantity: 1, expiresAt: new Date('2026-04-13'), categoryId: '81e5d31d-72e1-43ae-a541-2cf74866da6d' }, // 食品: 生鮮食品 (まもなく期限切れ)
            { userId: user1.id, name: '缶ビール（6缶パック）', quantity: 1, expiresAt: new Date('2026-10-31'), categoryId: 'd5a30848-6fe6-49b3-89a8-a1d26c251bb8' }, // 食品: 飲料・お酒
            { userId: user1.id, name: '消臭剤（玄関用）', quantity: 2, expiresAt: null, categoryId: '323aaa78-90d4-4a72-b2cc-5cb3821fca3a' }, // 日用品: バス・トイレ用品
            { userId: user1.id, name: 'アルミホイル', quantity: 1, expiresAt: null, categoryId: 'e9e71980-ee43-41cc-a412-471d8cfd217a' }, // 日用品: キッチン消耗品
            { userId: user1.id, name: 'ボールペン（黒）', quantity: 3, expiresAt: null, categoryId: '334258e8-3ef6-4f27-a04c-6d81b8d78149' }, // 雑貨: 文房具
        ],
        });

        // ユーザー2のアイテム（10件）
        await prisma.item.createMany({
        data: [
               { userId: user2.id, name: '豆腐（絹）', quantity: 1, expiresAt: new Date('2026-03-20'), categoryId: '81e5d31d-72e1-43ae-a541-2cf74866da6d' }, // 食品: 生鮮食品 (期限切れ)
                { userId: user2.id, name: 'ヨーグルト（プレーン）', quantity: 3, expiresAt: new Date('2026-04-14'), categoryId: '81e5d31d-72e1-43ae-a541-2cf74866da6d' }, // 食品: 生鮮食品 (まもなく期限切れ)
                { userId: user2.id, name: 'インスタントコーヒー', quantity: 1, expiresAt: null, categoryId: 'c494437f-6245-4100-a932-b87ced62aa74' }, // 食品: レトルト・インスタント
                { userId: user2.id, name: '歯磨き粉（2本）', quantity: 2, expiresAt: new Date('2027-06-01'), categoryId: '323aaa78-90d4-4a72-b2cc-5cb3821fca3a' }, // 日用品: バス・トイレ用品
                { userId: user2.id, name: 'レトルトカレー（中辛）', quantity: 5, expiresAt: new Date('2027-12-01'), categoryId: 'c494437f-6245-4100-a932-b87ced62aa74' }, // 食品: レトルト・インスタント
                { userId: user2.id, name: 'サランラップ', quantity: 1, expiresAt: null, categoryId: 'e9e71980-ee43-41cc-a412-471d8cfd217a' }, // 日用品: キッチン消耗品
                { userId: user2.id, name: 'マヨネーズ（中瓶）', quantity: 1, expiresAt: new Date('2026-07-01'), categoryId: '895bedc5-c0ed-4cf7-9478-a390907c8998' }, // 食品: 調味料
                { userId: user2.id, name: 'ティーバッグ（アールグレイ）', quantity: 1, expiresAt: null, categoryId: 'd5a30848-6fe6-49b3-89a8-a1d26c251bb8' }, // 食品: 飲料・お酒
                { userId: user2.id, name: '冷凍ピザ', quantity: 2, expiresAt: new Date('2026-06-15'), categoryId: 'c083623e-36a2-4f42-8a2b-babe6e48338c' }, // 食品: 冷凍食品
                { userId: user2.id, name: 'ボディソープ（詰め替え）', quantity: 1, expiresAt: new Date('2027-02-01'), categoryId: '323aaa78-90d4-4a72-b2cc-5cb3821fca3a' }, // 日用品: バス・トイレ用品

                // 【追加】ユーザー2の新しいアイテム（5件）
                { userId: user2.id, name: '絆創膏（100枚入）', quantity: 1, expiresAt: null, categoryId: '181d1397-5d7e-4740-b4f5-9db9e77f6010' }, // 雑貨: 常備薬・衛生用品
                { userId: user2.id, name: 'キャットフード（カリカリ）', quantity: 2, expiresAt: new Date('2026-11-20'), categoryId: 'fb26643f-ffc2-421d-ac83-9c6a144f34b2' }, // 雑貨: ペット用品
                { userId: user2.id, name: '単3アルカリ電池（8本）', quantity: 1, expiresAt: null, categoryId: '83cfec98-c1d3-4d0e-a9ff-26b757cd5f92' }, // 雑貨: 電池・工具
                { userId: user2.id, name: 'ポテトチップス（うすしお）', quantity: 3, expiresAt: new Date('2026-04-14'), categoryId: 'f77fcb95-580a-4f90-a618-b6d767e7c064' }, // 食品: お菓子 (まもなく期限切れ)
                { userId: user2.id, name: '洗濯ネット', quantity: 2, expiresAt: null, categoryId: 'a08ac876-4d4d-47ed-ac23-0971cc41edc9' }, // 日用品: 洗濯用品
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

seed()
    .catch((e) => {
        console.log(e.message);
        process.exit(1);
    }).finally(async () => {
        await prisma.$disconnect();
    });