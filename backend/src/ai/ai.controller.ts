import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser, CurrentUserData } from '../common/decorators/current-user.decorator';

@ApiTags('ai')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: 'ai', version: '1' })
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('recommend-outfit')
  async recommendOutfit(@CurrentUser() user: CurrentUserData, @Body() data: { occasion?: string; weather?: string; season?: string }) {
    return this.aiService.recommendOutfit(user.id, data);
  }

  @Post('chat')
  async chat(@CurrentUser() user: CurrentUserData, @Body() body: { message: string }) {
    return this.aiService.chat(user.id, body.message);
  }
}
