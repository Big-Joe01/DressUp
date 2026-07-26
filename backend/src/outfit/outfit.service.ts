import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OutfitService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string, options: { page?: number; limit?: number; occasion?: string } = {}) {
    const { page = 1, limit = 20, occasion } = options;
    const where: any = { userId };
    if (occasion) where.occasion = occasion;

    const [outfits, total] = await Promise.all([
      this.prisma.outfit.findMany({
        where,
        include: { items: { include: { clothingItem: { include: { category: true, images: { take: 1 } } } } } },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.outfit.count({ where }),
    ]);

    return { data: outfits, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async findOne(id: string, userId: string) {
    const outfit = await this.prisma.outfit.findFirst({
      where: { id, userId },
      include: { items: { include: { clothingItem: { include: { category: true, images: true } } } } },
    });
    if (!outfit) throw new NotFoundException('Outfit not found');
    return outfit;
  }

  async create(userId: string, data: { name?: string; occasion?: any; items: any[] }) {
    return this.prisma.outfit.create({
      data: {
        userId,
        name: data.name,
        occasion: data.occasion,
        items: { create: data.items.map(item => ({ clothingItemId: item.clothingItemId, layer: item.layer, isPrimary: item.isPrimary })) },
      },
      include: { items: { include: { clothingItem: true } } },
    });
  }

  async delete(id: string, userId: string) {
    await this.findOne(id, userId);
    await this.prisma.outfit.delete({ where: { id } });
    return { message: 'Outfit deleted' };
  }

  async markAsWorn(id: string, userId: string) {
    const outfit = await this.findOne(id, userId);
    await this.prisma.outfit.update({ where: { id }, data: { timesWorn: { increment: 1 }, lastWornAt: new Date() } });
    for (const item of outfit.items) {
      await this.prisma.clothingItem.update({ where: { id: item.clothingItemId }, data: { wearCount: { increment: 1 }, lastWornAt: new Date() } });
    }
    return { message: 'Marked as worn' };
  }
}
