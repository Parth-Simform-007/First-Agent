import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { BonusStatus, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReferralBonusDto } from './dto/create-referral-bonus.dto';
import { QueryReferralBonusDto } from './dto/query-referral-bonus.dto';
import { UpdateReferralBonusDto } from './dto/update-referral-bonus.dto';

// S-Rank Mission Service: Core logic for referral bonus operations
@Injectable()
export class ReferralBonusService {
  constructor(private readonly prisma: PrismaService) {}

  // Rasengan Strike: Creating a referral bonus record with full validation
  async create(dto: CreateReferralBonusDto) {
    // Sharingan Check: Verify the user exists before awarding bonus
    const user = await this.prisma.user.findUnique({
      where: { id: dto.userId },
    });
    if (!user) {
      throw new NotFoundException(
        `Shinobi with ID ${dto.userId} not found in the village registry`,
      );
    }

    return this.prisma.referralBonus.create({
      data: {
        userId: dto.userId,
        amount: dto.amount,
        reason: dto.reason,
        status: dto.status ?? BonusStatus.PENDING,
        expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : null,
      },
      include: { user: { select: { id: true, name: true, email: true } } },
    });
  }

  // Byakugan Vision: Fetch all referral bonuses with filtering and pagination
  async findAll(query: QueryReferralBonusDto) {
    const { status, userId, page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    // Chakra Flow Optimization: Build dynamic where clause
    const where: Prisma.ReferralBonusWhereInput = {};
    if (status) where.status = status;
    if (userId) where.userId = userId;

    const [data, total] = await this.prisma.$transaction([
      // Shadow Clone Technique: Parallel queries for data and count
      this.prisma.referralBonus.findMany({
        where,
        skip,
        take: limit,
        include: { user: { select: { id: true, name: true, email: true } } },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.referralBonus.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Ninja Path: Find a single referral bonus by ID
  async findOne(id: string) {
    const bonus = await this.prisma.referralBonus.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, name: true, email: true, referralCode: true },
        },
      },
    });

    if (!bonus) {
      throw new NotFoundException(
        `Referral bonus scroll #${id} not found in the archives`,
      );
    }

    return bonus;
  }

  // Wind Style: Smoothly update a referral bonus record
  async update(id: string, dto: UpdateReferralBonusDto) {
    await this.findOne(id); // Sharingan: Verify existence before update

    return this.prisma.referralBonus.update({
      where: { id },
      data: {
        ...dto,
        expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : undefined,
      },
      include: { user: { select: { id: true, name: true, email: true } } },
    });
  }

  // Fire Style Removal: Delete a referral bonus entry
  async remove(id: string) {
    await this.findOne(id); // Verify target exists
    return this.prisma.referralBonus.delete({ where: { id } });
  }

  // Hokage Report: Aggregate bonus stats for a specific user
  async getUserBonusSummary(userId: string) {
    // Byakugan Vision: Check user exists first
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`Shinobi ${userId} not found`);
    }

    // Chakra Flow Aggregation: Sum up all bonus amounts by status
    const summary = await this.prisma.referralBonus.groupBy({
      by: ['status'],
      where: { userId },
      _sum: { amount: true },
      _count: true,
    });

    const totalReferrals = await this.prisma.user.count({
      where: { referredById: userId },
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        referralCode: user.referralCode,
      },
      bonusSummary: summary,
      totalReferrals,
    };
  }

  // Lightning Style: Approve a pending referral bonus instantly
  async approveBonus(id: string) {
    const bonus = await this.findOne(id);

    if (bonus.status !== BonusStatus.PENDING) {
      throw new BadRequestException(
        `Cannot approve a bonus that is already ${bonus.status}`,
      );
    }

    return this.prisma.referralBonus.update({
      where: { id },
      data: { status: BonusStatus.APPROVED },
      include: { user: { select: { id: true, name: true, email: true } } },
    });
  }
}
