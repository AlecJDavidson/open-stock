import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

const partData = {
  id: uuidv4(),
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

export const seed = async () => {
  console.log(`Start seeding ...`);
  try {
    const part = await prisma.part.create({
      data: partData,
    });
    console.log(`Created part with id: ${part.name}`);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
    console.log(`Seeding finished.`);
  }
};

seed();
