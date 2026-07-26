import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
@ApiTags('inspiration')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: 'inspiration', version: '1' })
export class InspirationController {}
