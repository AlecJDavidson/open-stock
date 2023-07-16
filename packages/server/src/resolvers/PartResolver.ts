import { Query, Resolver, Arg, Mutation } from 'type-graphql'
import { PrismaClient, Prisma } from '@prisma/client'
import { Part, PartFilter } from '../types/Part'
import { v4 as uuidv4 } from 'uuid'

@Resolver()
export class PartResolver {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  @Query(() => [Part])
  async parts(): Promise<Part[]> {
    return this.prisma.part.findMany()
  }

  @Query(() => Part, { nullable: true })
  async part(@Arg('id') id: string): Promise<Part | null> {
    return this.prisma.part.findUnique({ where: { id } })
  }

  // @Query(() => [Part])
  // async partsByFilter(
  //   @Arg('filter', () => PartFilter, { nullable: true }) filter?: PartFilter,
  // ): Promise<Part[]> {
  //   const where: Prisma.PartWhereInput = filter
  //     ? {
  //         OR: [
  //           { brand: { contains: filter.keyword } },
  //           { name: { contains: filter.keyword } },
  //           { model: { contains: filter.keyword } },
  //           { description: { contains: filter.keyword } },
  //           { bin: { contains: filter.keyword } },
  //           { container: { contains: filter.keyword } },
  //           { location: { contains: filter.keyword } },
  //           { tags: { has: filter.keyword } },
  //         ],
  //       }
  //     : {}
  //
  //   return this.prisma.part.findMany({ where })
  // }

  @Query(() => [Part])
  async partsBy(@Arg('search') search: string): Promise<Part[]> {
    return this.prisma.part.findMany({
      where: {
        OR: [
          { brand: { contains: search, mode: 'insensitive' } },
          { name: { contains: search, mode: 'insensitive' } },
          { model: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { bin: { contains: search, mode: 'insensitive' } },
          { container: { contains: search, mode: 'insensitive' } },
          { location: { contains: search, mode: 'insensitive' } },
          { tags: { has: search  } },
        ],
      },
    })
  }

  @Mutation(() => Part)
  async createPart(
    @Arg('brand') brand: string,
    @Arg('name') name: string,
    @Arg('model') model: string,
    @Arg('description') description: string,
    @Arg('bin') bin: string,
    @Arg('container') container: string,
    @Arg('location') location: string,
    @Arg('quantity') quantity: number,
    @Arg('tags', () => [String]) tags: string[],
  ): Promise<Part> {
    return this.prisma.part.create({
      data: {
        id: uuidv4(),
        brand,
        name,
        model,
        description,
        bin,
        container,
        location,
        quantity,
        tags,
      },
    })
  }

  @Mutation(() => Part, { nullable: true })
  async updatePart(
    @Arg('id') id: string,
    @Arg('brand', { nullable: true }) brand?: string,
    @Arg('name', { nullable: true }) name?: string,
    @Arg('model', { nullable: true }) model?: string,
    @Arg('description', { nullable: true }) description?: string,
    @Arg('bin', { nullable: true }) bin?: string,
    @Arg('container', { nullable: true }) container?: string,
    @Arg('location', { nullable: true }) location?: string,
    @Arg('quantity', { nullable: true }) quantity?: number,
    @Arg('tags', () => [String], { nullable: true }) tags?: string[],
  ): Promise<Part | null> {
    return this.prisma.part.update({
      where: { id },
      data: {
        brand,
        name,
        model,
        description,
        bin,
        container,
        location,
        quantity,
        tags,
      },
    })
  }

  @Mutation(() => Boolean)
  async deletePart(@Arg('id') id: string): Promise<boolean> {
    const deleteResult = await this.prisma.part.delete({ where: { id } })
    return Boolean(deleteResult)
  }
}
