import { Module } from '@nestjs/common';
import { ReferralBonusController } from './referral-bonus.controller';
import { ReferralBonusService } from './referral-bonus.service';

// Hidden Leaf Module: Binding all referral bonus components together
@Module({
  controllers: [ReferralBonusController],
  providers: [ReferralBonusService],
  exports: [ReferralBonusService],
})
export class ReferralBonusModule {}
