import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
@ApiTags('packing')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: 'packing', version: '1' })
export class PackingController {}
