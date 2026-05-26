import { ApiPropertyOptional } from '@nestjs/swagger';
import { BonusStatus } from '@prisma/client';
import { IsOptional, IsEnum, IsNumber, IsString, Min } from 'class-validator';

// Ninja Tools Update: Partial update payload for referral bonus
export class UpdateReferralBonusDto {
  @ApiPropertyOptional({ description: 'Updated bonus amount' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  amount?: number;

  @ApiPropertyOptional({ enum: BonusStatus })
  @IsOptional()
  @IsEnum(BonusStatus)
  status?: BonusStatus;

  @ApiPropertyOptional({ description: 'Updated reason' })
  @IsOptional()
  @IsString()
  reason?: string;

  @ApiPropertyOptional({ description: 'Updated expiry date' })
  @IsOptional()
  expiresAt?: string;
}
