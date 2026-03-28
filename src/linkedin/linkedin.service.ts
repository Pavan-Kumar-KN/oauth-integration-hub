import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LinkedinService {
  constructor(private configService: ConfigService) {}

  getAuthUrl(): string {
    // Here we can add more scopes of the user like ads posting , lead sync permission you can refer myappz docs or check docs folder in this project so you will get the setup guide
    const scope = encodeURIComponent('openid profile email w_member_social');

    const client_id = this.configService.get<string>('LINKEDIN_CLIENT_ID');
    const redirect_uri = this.configService.get<string>(
      'LINKEDIN_REDIRECT_URI',
    );

    const url: string =
      'https://www.linkedin.com/oauth/v2/authorization?' +
      `response_type=code&` +
      `client_id=${encodeURIComponent(client_id || '')}&` +
      `redirect_uri=${encodeURIComponent(redirect_uri || '')}&` +
      `scope=${scope}&`;

    return url;
  }
  
  authCallback(code: string) {
    
  }
}
