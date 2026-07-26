import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
@ApiTags('laundry')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: 'laundry', version: '1' })
export class LaundryController {}
