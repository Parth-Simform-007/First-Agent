import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// Hidden Leaf Infrastructure: Global Prisma module available across all jutsu
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
