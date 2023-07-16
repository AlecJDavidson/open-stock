"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartResolver = void 0;
const type_graphql_1 = require("type-graphql");
const client_1 = require("@prisma/client");
const Part_1 = require("../types/Part");
const uuid_1 = require("uuid");
let PartResolver = class PartResolver {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async parts() {
        return this.prisma.part.findMany();
    }
    async part(id) {
        return this.prisma.part.findUnique({ where: { id } });
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
    async partsBy(search) {
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
                    { tags: { has: search } },
                ],
            },
        });
    }
    async createPart(brand, name, model, description, bin, container, location, quantity, tags) {
        return this.prisma.part.create({
            data: {
                id: (0, uuid_1.v4)(),
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
        });
    }
    async updatePart(id, brand, name, model, description, bin, container, location, quantity, tags) {
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
        });
    }
    async deletePart(id) {
        const deleteResult = await this.prisma.part.delete({ where: { id } });
        return Boolean(deleteResult);
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Part_1.Part]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PartResolver.prototype, "parts", null);
__decorate([
    (0, type_graphql_1.Query)(() => Part_1.Part, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PartResolver.prototype, "part", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Part_1.Part]),
    __param(0, (0, type_graphql_1.Arg)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PartResolver.prototype, "partsBy", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Part_1.Part),
    __param(0, (0, type_graphql_1.Arg)('brand')),
    __param(1, (0, type_graphql_1.Arg)('name')),
    __param(2, (0, type_graphql_1.Arg)('model')),
    __param(3, (0, type_graphql_1.Arg)('description')),
    __param(4, (0, type_graphql_1.Arg)('bin')),
    __param(5, (0, type_graphql_1.Arg)('container')),
    __param(6, (0, type_graphql_1.Arg)('location')),
    __param(7, (0, type_graphql_1.Arg)('quantity')),
    __param(8, (0, type_graphql_1.Arg)('tags', () => [String])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String, Number, Array]),
    __metadata("design:returntype", Promise)
], PartResolver.prototype, "createPart", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Part_1.Part, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __param(1, (0, type_graphql_1.Arg)('brand', { nullable: true })),
    __param(2, (0, type_graphql_1.Arg)('name', { nullable: true })),
    __param(3, (0, type_graphql_1.Arg)('model', { nullable: true })),
    __param(4, (0, type_graphql_1.Arg)('description', { nullable: true })),
    __param(5, (0, type_graphql_1.Arg)('bin', { nullable: true })),
    __param(6, (0, type_graphql_1.Arg)('container', { nullable: true })),
    __param(7, (0, type_graphql_1.Arg)('location', { nullable: true })),
    __param(8, (0, type_graphql_1.Arg)('quantity', { nullable: true })),
    __param(9, (0, type_graphql_1.Arg)('tags', () => [String], { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String, String, Number, Array]),
    __metadata("design:returntype", Promise)
], PartResolver.prototype, "updatePart", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PartResolver.prototype, "deletePart", null);
PartResolver = __decorate([
    (0, type_graphql_1.Resolver)(),
    __metadata("design:paramtypes", [])
], PartResolver);
exports.PartResolver = PartResolver;
