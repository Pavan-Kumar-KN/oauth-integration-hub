import { Module } from '@nestjs/common';
import { LinkedinModule } from './linkedin/linkedin.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), LinkedinModule],
})
export class AppModule {}
