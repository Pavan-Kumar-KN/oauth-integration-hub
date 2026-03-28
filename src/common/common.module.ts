import { Module } from '@nestjs/common';
import { AuthCallbackService } from './services/authcallback.service';

@Module({
  exports: [AuthCallbackService],
})
export class AppModule {}
