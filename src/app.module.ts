import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ReferralBonusModule } from './referral-bonus/referral-bonus.module';

// Hokage HQ: Root module orchestrating all shinobi modules
@Module({
  imports: [PrismaModule, ReferralBonusModule],
})
export class AppModule {}
