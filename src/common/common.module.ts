import { Global, Module } from '@nestjs/common';
import { AuthCallbackService } from './services/authcallback.service';

@Global()
@Module({
  exports: [AuthCallbackService],
})
export class CommomServiceModule {}
