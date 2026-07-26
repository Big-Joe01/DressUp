import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ItemStatus } from '@prisma/client';

@Injectable()
export class ClothingService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    userId: string,
    options: {
      page?: number;
      limit?: number;
      search?: string;
      categoryId?: string;
      status?: ItemStatus;
    } = {},
  ) {
    const { page = 1, limit = 20, search, categoryId, status } = options;

    const where: any = { userId };
    if (search) where.name = { contains: search, mode: 'insensitive' };
    if (categoryId) where.categoryId = categoryId;
    if (status) where.status = status;

    const [items, total] = await Promise.all([
      this.prisma.clothingItem.findMany({
        where,
        include: {
          category: true,
          primaryColor: true,
          brand: true,
          images: { take: 1 },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.clothingItem.count({ where }),
    ]);

    return {
      data: items,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: string, userId: string) {
    const item = await this.prisma.clothingItem.findFirst({
      where: { id, userId },
      include: {
        category: true,
        primaryColor: true,
        secondaryColor: true,
        brand: true,
        pattern: true,
        material: true,
        style: true,
        images: true,
      },
    });
    if (!item) throw new NotFoundException('Clothing item not found');
    return item;
  }

  async create(userId: string, data: any) {
    return this.prisma.clothingItem.create({
      data: { ...data, userId },
      include: {
        category: true,
        primaryColor: true,
        images: true,
      },
    });
  }

  async update(id: string, userId: string, data: any) {
    await this.findOne(id, userId);
    return this.prisma.clothingItem.update({
      where: { id },
      data,
      include: { category: true, primaryColor: true },
    });
  }

  async delete(id: string, userId: string) {
    await this.findOne(id, userId);
    await this.prisma.clothingItem.delete({ where: { id } });
    return { message: 'Item deleted successfully' };
  }

  async getCategories() {
    return this.prisma.category.findMany({
      where: { parentId: null },
      include: { subcategories: true },
      orderBy: { name: 'asc' },
    });
  }

  async getColors() {
    return this.prisma.color.findMany({ orderBy: { name: 'asc' } });
  }

  async getBrands(search?: string) {
    return this.prisma.brand.findMany({
      where: search ? { name: { contains: search, mode: 'insensitive' } } : {},
      orderBy: { name: 'asc' },
      take: 20,
    });
  }
}
