import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReferralBonusService } from './referral-bonus.service';
import { CreateReferralBonusDto } from './dto/create-referral-bonus.dto';
import { QueryReferralBonusDto } from './dto/query-referral-bonus.dto';
import { UpdateReferralBonusDto } from './dto/update-referral-bonus.dto';

// ANBU Ops Controller: Managing all referral bonus missions from the Hidden Leaf
@ApiTags('Referral Bonus')
@Controller('referral-bonus')
export class ReferralBonusController {
  constructor(private readonly referralBonusService: ReferralBonusService) {}

  // Summoning Jutsu: Activate a new referral bonus for a shinobi
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new referral bonus' })
  @ApiResponse({
    status: 201,
    description: 'Referral bonus created successfully',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 400, description: 'Invalid payload' })
  create(@Body() dto: CreateReferralBonusDto) {
    return this.referralBonusService.create(dto);
  }

  // Byakugan Scan: List all referral bonuses with filters
  @Get()
  @ApiOperation({ summary: 'List all referral bonuses with optional filters' })
  @ApiResponse({
    status: 200,
    description: 'Returns paginated referral bonuses',
  })
  findAll(@Query() query: QueryReferralBonusDto) {
    return this.referralBonusService.findAll(query);
  }

  // Hokage Report: Get bonus statistics summary for a user
  @Get('user/:userId/summary')
  @ApiOperation({ summary: 'Get referral bonus summary for a user' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns bonus summary and referral count',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  getUserSummary(@Param('userId') userId: string) {
    return this.referralBonusService.getUserBonusSummary(userId);
  }

  // Ninja Path Lookup: Retrieve a single bonus by ID
  @Get(':id')
  @ApiOperation({ summary: 'Get a single referral bonus by ID' })
  @ApiParam({ name: 'id', description: 'Referral bonus ID' })
  @ApiResponse({ status: 200, description: 'Returns referral bonus details' })
  @ApiResponse({ status: 404, description: 'Referral bonus not found' })
  findOne(@Param('id') id: string) {
    return this.referralBonusService.findOne(id);
  }

  // Wind Style Patch: Update a referral bonus record
  @Patch(':id')
  @ApiOperation({ summary: 'Update a referral bonus' })
  @ApiParam({ name: 'id', description: 'Referral bonus ID' })
  @ApiResponse({ status: 200, description: 'Referral bonus updated' })
  @ApiResponse({ status: 404, description: 'Referral bonus not found' })
  update(@Param('id') id: string, @Body() dto: UpdateReferralBonusDto) {
    return this.referralBonusService.update(id, dto);
  }

  // Lightning Style Approval: Instantly approve a pending bonus
  @Patch(':id/approve')
  @ApiOperation({ summary: 'Approve a pending referral bonus' })
  @ApiParam({ name: 'id', description: 'Referral bonus ID' })
  @ApiResponse({ status: 200, description: 'Bonus approved successfully' })
  @ApiResponse({ status: 400, description: 'Bonus is not in PENDING status' })
  @ApiResponse({ status: 404, description: 'Referral bonus not found' })
  approveBonus(@Param('id') id: string) {
    return this.referralBonusService.approveBonus(id);
  }

  // Fire Style Deletion: Remove a referral bonus from the records
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a referral bonus' })
  @ApiParam({ name: 'id', description: 'Referral bonus ID' })
  @ApiResponse({ status: 204, description: 'Referral bonus deleted' })
  @ApiResponse({ status: 404, description: 'Referral bonus not found' })
  remove(@Param('id') id: string) {
    return this.referralBonusService.remove(id);
  }
}
