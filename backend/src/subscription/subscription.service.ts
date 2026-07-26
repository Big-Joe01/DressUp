import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class SubscriptionService {
  constructor(private readonly prisma: PrismaService) {}
}
