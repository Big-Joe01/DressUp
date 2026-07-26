import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ItemStatus } from '@prisma/client';

@Injectable()
export class AiService {
  constructor(private readonly prisma: PrismaService) {}

  async recommendOutfit(userId: string, data: { occasion?: string; weather?: string; season?: string }) {
    // Get user's available clothing items
    const items = await this.prisma.clothingItem.findMany({
      where: { userId, status: ItemStatus.AVAILABLE },
      include: { category: true, primaryColor: true, images: { take: 1 } },
    });

    // Simple recommendation logic - in production, this would use OpenAI
    const top = items.filter(i => ['T-Shirt', 'Shirt', 'Blouse'].includes(i.category?.name));
    const bottom = items.filter(i => ['Jeans', 'Trousers', 'Shorts'].includes(i.category?.name));
    const shoes = items.filter(i => ['Sneakers', 'Shoes', 'Boots'].includes(i.category?.name));

    const recommendation = {
      items: [
        top[0] ? { clothingItem: top[0], layer: 'BASE', isPrimary: true } : null,
        bottom[0] ? { clothingItem: bottom[0], layer: 'BOTTOM', isPrimary: false } : null,
        shoes[0] ? { clothingItem: shoes[0], layer: 'SHOES', isPrimary: false } : null,
      ].filter(Boolean),
      reasoning: 'Selected items based on your wardrobe and occasion preferences.',
      scores: { style: 85, color: 90, occasion: 80, overall: 85 },
    };

    return recommendation;
  }

  async chat(userId: string, message: string) {
    // Simple chat response - in production, use OpenAI
    const responses: Record<string, string> = {
      'what should i wear': 'Based on your wardrobe and today\'s weather, I recommend a casual layered look. Would you like me to create an outfit for you?',
      'dress me for': 'I\'d be happy to help you get dressed! What\'s the occasion - work, date, or casual?',
      'match these shoes': 'Great choice! I can suggest pants and tops that would pair well. Can you share a photo of the shoes?',
    };

    const lowerMessage = message.toLowerCase();
    let response = 'I\'m your personal AI stylist! Ask me about outfit recommendations, style advice, or what to wear today.';

    for (const [key, value] of Object.entries(responses)) {
      if (lowerMessage.includes(key)) {
        response = value;
        break;
      }
    }

    return { response, suggestions: ['Show me casual outfits', 'What should I wear to work?', 'Help me find outfit gaps'] };
  }

  async analyzeBodyScan(frontUrl: string, sideUrl?: string, backUrl?: string, height?: number) {
    // Placeholder - in production, use computer vision
    const measurements = {
      chest: height ? height * 0.5 : 95,
      waist: height ? height * 0.4 : 80,
      hip: height ? height * 0.55 : 95,
      shoulderWidth: height ? height * 0.3 : 45,
      armLength: height ? height * 0.35 : 60,
      inseam: height ? height * 0.45 : 75,
    };
    return measurements;
  }
}
