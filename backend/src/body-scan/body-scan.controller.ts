import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
@ApiTags('body-scan')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: 'body-scan', version: '1' })
export class BodyScanController {}
