import { Prisma } from '@/generated/prisma/client';

export type User = Prisma.UserGetPayload<{}>;
export type Item = Prisma.ItemGetPayload<{}>;