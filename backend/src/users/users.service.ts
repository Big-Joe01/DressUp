import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { profile: true },
    });
    if (!user) throw new NotFoundException('User not found');
    const { password, ...result } = user;
    return result;
  }

  async update(id: string, data: { firstName?: string; lastName?: string }) {
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        profile: {
          update: data,
        },
      },
      include: { profile: true },
    });
    const { password, ...result } = user;
    return result;
  }

  async delete(id: string) {
    await this.prisma.user.delete({ where: { id } });
    return { message: 'User deleted successfully' };
  }

  async getStats(id: string) {
    const [totalItems, totalOutfits] = await Promise.all([
      this.prisma.clothingItem.count({ where: { userId: id } }),
      this.prisma.outfit.count({ where: { userId: id } }),
    ]);
    return { totalItems, totalOutfits };
  }
}
