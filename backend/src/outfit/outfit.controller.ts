import { Controller, Get, Post, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { OutfitService } from './outfit.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser, CurrentUserData } from '../common/decorators/current-user.decorator';

@ApiTags('outfits')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: 'outfits', version: '1' })
export class OutfitController {
  constructor(private readonly outfitService: OutfitService) {}

  @Get()
  async findAll(@CurrentUser() user: CurrentUserData, @Query('page') page?: number, @Query('occasion') occasion?: string) {
    return this.outfitService.findAll(user.id, { page, occasion });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser() user: CurrentUserData) {
    return this.outfitService.findOne(id, user.id);
  }

  @Post()
  async create(@CurrentUser() user: CurrentUserData, @Body() data: { name?: string; occasion?: any; items: any[] }) {
    return this.outfitService.create(user.id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @CurrentUser() user: CurrentUserData) {
    return this.outfitService.delete(id, user.id);
  }

  @Post(':id/wear')
  async markAsWorn(@Param('id') id: string, @CurrentUser() user: CurrentUserData) {
    return this.outfitService.markAsWorn(id, user.id);
  }
}
