import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProfileModule } from './profile/profile.module';
import { ClothingModule } from './clothing/clothing.module';
import { OutfitModule } from './outfit/outfit.module';
import { AiModule } from './ai/ai.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { BodyScanModule } from './body-scan/body-scan.module';
import { CalendarModule } from './calendar/calendar.module';
import { PackingModule } from './packing/packing.module';
import { LaundryModule } from './laundry/laundry.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { NotificationsModule } from './notifications/notifications.module';
import { InspirationModule } from './inspiration/inspiration.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100,
    }]),
    PrismaModule,
    AuthModule,
    UsersModule,
    ProfileModule,
    ClothingModule,
    OutfitModule,
    AiModule,
    CloudinaryModule,
    BodyScanModule,
    CalendarModule,
    PackingModule,
    LaundryModule,
    AnalyticsModule,
    SubscriptionModule,
    NotificationsModule,
    InspirationModule,
    AdminModule,
  ],
})
export class AppModule {}
