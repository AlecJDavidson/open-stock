"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
const client_1 = require("@prisma/client");
const uuid_1 = require("uuid");
const prisma = new client_1.PrismaClient();
const partData = {
    id: (0, uuid_1.v4)(),
    brand: 'brand',
    name: 'part name',
    model: 'model number',
    description: 'part description',
    bin: '01',
    container: 'A1',
    location: 'location',
    quantity: 0,
    tags: ['tag1', 'tag2', 'tag3'],
};
const seed = async () => {
    console.log(`Start seeding ...`);
    try {
        const part = await prisma.part.create({
            data: partData,
        });
        console.log(`Created part with id: ${part.name}`);
    }
    catch (error) {
        console.error(error);
    }
    finally {
        await prisma.$disconnect();
        console.log(`Seeding finished.`);
    }
};
exports.seed = seed;
(0, exports.seed)();
