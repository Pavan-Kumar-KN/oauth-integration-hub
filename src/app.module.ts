import { Module } from '@nestjs/common';
import { LinkedinModule } from './linkedin/linkedin.module';
import { ConfigModule } from '@nestjs/config';
import { CommomServiceModule } from './common/common.module';

@Module({
  imports: [ConfigModule.forRoot(), LinkedinModule, CommomServiceModule],
})
export class AppModule {}
