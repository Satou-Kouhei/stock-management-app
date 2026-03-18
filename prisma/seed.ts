'use server'

import { prisma } from '@/lib/prisma';

export async function seed() {
    try {
        const user1 = await prisma.user.create({
        data: {
            name: '佐藤 太郎',
            password: 'hashed_password_1', 
        },
        });

        const user2 = await prisma.user.create({
        data: {
            name: '鈴木 花子',
            password: 'hashed_password_2',
        },
        });

        // ユーザー1のアイテム（10件）
        await prisma.item.createMany({
        data: [
            { userId: user1.id, name: '牛乳（1L）', quantity: 2, expiresAt: new Date('2026-04-05') },
            { userId: user1.id, name: '卵（10個パック）', quantity: 1, expiresAt: new Date('2026-04-02') },
            { userId: user1.id, name: '食パン（6枚切り）', quantity: 2, expiresAt: new Date('2026-03-25') },
            { userId: user1.id, name: 'トイレットペーパー（12ロール）', quantity: 3, expiresAt: null },
            { userId: user1.id, name: 'シャンプー（詰め替え）', quantity: 1, expiresAt: new Date('2027-01-01') },
            { userId: user1.id, name: 'バター（200g）', quantity: 1, expiresAt: new Date('2026-05-15') },
            { userId: user1.id, name: '納豆（3パック）', quantity: 4, expiresAt: new Date('2026-03-22') },
            { userId: user1.id, name: 'ティッシュペーパー（5箱）', quantity: 2, expiresAt: null },
            { userId: user1.id, name: '冷凍うどん（5食）', quantity: 2, expiresAt: new Date('2026-09-01') },
            { userId: user1.id, name: '洗剤（液体詰め替え）', quantity: 1, expiresAt: new Date('2027-03-01') },
        ],
        });

        // ユーザー2のアイテム（10件）
        await prisma.item.createMany({
        data: [
            { userId: user2.id, name: '豆腐（絹）', quantity: 1, expiresAt: new Date('2026-03-20') },
            { userId: user2.id, name: 'ヨーグルト（プレーン）', quantity: 3, expiresAt: new Date('2026-03-28') },
            { userId: user2.id, name: 'インスタントコーヒー', quantity: 1, expiresAt: null },
            { userId: user2.id, name: '歯磨き粉（2本）', quantity: 2, expiresAt: new Date('2027-06-01') },
            { userId: user2.id, name: 'レトルトカレー（中辛）', quantity: 5, expiresAt: new Date('2027-12-01') },
            { userId: user2.id, name: 'サランラップ', quantity: 1, expiresAt: null },
            { userId: user2.id, name: 'マヨネーズ（中瓶）', quantity: 1, expiresAt: new Date('2026-07-01') },
            { userId: user2.id, name: 'ティーバッグ（アールグレイ）', quantity: 1, expiresAt: null },
            { userId: user2.id, name: '冷凍ピザ', quantity: 2, expiresAt: new Date('2026-06-15') },
            { userId: user2.id, name: 'ボディソープ（詰め替え）', quantity: 1, expiresAt: new Date('2027-02-01') },
        ],
        });

        console.log('テストデータ登録完了');
        return { success: true, message: '20件登録しました' };
    } catch (error) {
        if (error instanceof Error){
            console.error("詳細:", error.message);
        }
  } finally {
        await prisma.$disconnect();
    }
}