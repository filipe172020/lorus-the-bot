import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

// salva a memoria do user
export async function saveMemory(userId: string, content: string) {
    return prisma.memory.create({
        data: { userId, content }
    });
}

// pega ultimas 5 mensagens do user
export async function getLastMemories(userId: string, limit: 5) {
    return prisma.memory.findMany({
        where: { userId }, orderBy: { createdAt: 'desc' }, take: limit
    });
}

// salvar no cache
export async function setCache(key: string, value: string, ttlSeconds: 3600) {
    const expiresAt = new Date(Date.now() + ttlSeconds * 1000);
    return prisma.cache.upsert({
        where: { key }, update: { value, expiresAt }, create: { key, value, expiresAt }
    })
}

// busca no cache
export async function getCache(key: string) {
    const cache = await prisma.cache.findUnique({ where: { key } });
    if (!cache) return null;

    if (cache.expiresAt && cache.expiresAt < new Date()) {
        await prisma.cache.delete({ where: { key } });
        return null;
    }

    return cache.value;

}





