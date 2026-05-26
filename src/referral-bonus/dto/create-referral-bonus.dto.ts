import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BonusStatus } from '@prisma/client';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  IsDateString,
  Min,
  IsNotEmpty,
} from 'class-validator';

// Mission Scroll: Payload for creating a new referral bonus entry
export class CreateReferralBonusDto {
  @ApiProperty({ description: 'ID of the user receiving the bonus' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'Bonus amount in credits', example: 100 })
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiProperty({
    description: 'Reason for the referral bonus',
    example: 'New user signup via referral',
  })
  @IsString()
  @IsNotEmpty()
  reason: string;

  @ApiPropertyOptional({ enum: BonusStatus, default: BonusStatus.PENDING })
  @IsOptional()
  @IsEnum(BonusStatus)
  status?: BonusStatus;

  @ApiPropertyOptional({ description: 'Expiry date for the bonus' })
  @IsOptional()
  @IsDateString()
  expiresAt?: string;
}
