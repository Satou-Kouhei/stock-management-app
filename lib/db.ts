import { prisma } from './prisma';
import { User, Item } from './types';

export async function getUser(name: string, pass: string): Promise<User | null> {
    return await prisma.user.findFirst({
        where: {
            name: name,
            password: pass,
        }
    })
}

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

export async function createUser(username: string, userpass: string) {
    return await prisma.user.create({
        data: {
            name: username,
            password: userpass
        }
    });
}