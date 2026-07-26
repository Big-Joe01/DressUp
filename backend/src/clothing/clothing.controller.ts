import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ClothingService } from './clothing.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser, CurrentUserData } from '../common/decorators/current-user.decorator';

@ApiTags('clothing')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: 'clothing', version: '1' })
export class ClothingController {
  constructor(private readonly clothingService: ClothingService) {}

  @Get()
  async findAll(
    @CurrentUser() user: CurrentUserData,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('categoryId') categoryId?: string,
  ) {
    return this.clothingService.findAll(user.id, { page, limit, search, categoryId });
  }

  @Get('categories')
  async getCategories() {
    return this.clothingService.getCategories();
  }

  @Get('colors')
  async getColors() {
    return this.clothingService.getColors();
  }

  @Get('brands')
  async getBrands(@Query('search') search?: string) {
    return this.clothingService.getBrands(search);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser() user: CurrentUserData) {
    return this.clothingService.findOne(id, user.id);
  }

  @Post()
  async create(@CurrentUser() user: CurrentUserData, @Body() data: any) {
    return this.clothingService.create(user.id, data);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserData,
    @Body() data: any,
  ) {
    return this.clothingService.update(id, user.id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @CurrentUser() user: CurrentUserData) {
    return this.clothingService.delete(id, user.id);
  }
}
