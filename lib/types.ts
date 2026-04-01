import { Prisma } from '@/generated/prisma/client';

// DB関係
export type User = Prisma.UserGetPayload<{}>;
export type Item = Prisma.ItemGetPayload<{}>;

// セッション関係
export type SessionPayload = {
    userId: string;
    expiresAt: Date;
};