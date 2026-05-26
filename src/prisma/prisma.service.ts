import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// Summoning Jutsu: Calling forth the Prisma database connection
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    // Chakra Flow: Establishing database connection
    await this.$connect();
  }

  async onModuleDestroy() {
    // Sealing Jutsu: Cleanly closing database connection
    await this.$disconnect();
  }
}
