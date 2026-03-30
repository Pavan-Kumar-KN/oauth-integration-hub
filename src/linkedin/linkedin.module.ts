import { Module } from '@nestjs/common';
import { LinkedinController } from './linkedin.controller';
import { LinkedinService } from './linkedin.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [ConfigModule, PrismaModule],
  controllers: [LinkedinController],
  providers: [LinkedinService],
})
export class LinkedinModule {}
