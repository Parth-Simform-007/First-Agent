import { ApiPropertyOptional } from '@nestjs/swagger';
import { BonusStatus } from '@prisma/client';
import { IsOptional, IsEnum, IsString, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

// Byakugan Vision: Query filters to see all angles of referral bonuses
export class QueryReferralBonusDto {
  @ApiPropertyOptional({ enum: BonusStatus })
  @IsOptional()
  @IsEnum(BonusStatus)
  status?: BonusStatus;

  @ApiPropertyOptional({ description: 'Filter by user ID' })
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;
}
