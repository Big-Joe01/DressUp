import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
@ApiTags('subscription')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: 'subscription', version: '1' })
export class SubscriptionController {}
