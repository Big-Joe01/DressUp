import { Controller, Get, Patch, Delete, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser, CurrentUserData } from '../common/decorators/current-user.decorator';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getMe(@CurrentUser() user: CurrentUserData) {
    return this.usersService.findById(user.id);
  }

  @Patch('me')
  async updateMe(
    @CurrentUser() user: CurrentUserData,
    @Body() data: { firstName?: string; lastName?: string },
  ) {
    return this.usersService.update(user.id, data);
  }

  @Delete('me')
  async deleteMe(@CurrentUser() user: CurrentUserData) {
    return this.usersService.delete(user.id);
  }

  @Get('me/stats')
  async getStats(@CurrentUser() user: CurrentUserData) {
    return this.usersService.getStats(user.id);
  }
}
