import { Injectable } from '@nestjs/common';

// This is the global service that is used across all the modules be
@Injectable()
export class AuthCallbackService {
  authCallback(code: string) {
    return code;
  }
}