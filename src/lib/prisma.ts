import prisma, * as prismaAll from '@prisma/client';

const PrismaClient = prisma?.PrismaClient ?? prismaAll?.PrismaClient;

export default PrismaClient;
