import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OauthBaseUrl } from 'src/common/constants/url';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LinkedinService {
  constructor(
    private configService: ConfigService,
    private prismaDBService: PrismaService,
  ) {}

  getAuthUrl(): string {
    // Here we can add more scopes of the user like ads posting , lead sync permission you can refer myappz docs or check docs folder in this project so you will get the setup guide
    const scope = encodeURIComponent('openid profile email w_member_social');

    const client_id = this.configService.get<string>('LINKEDIN_CLIENT_ID');
    const redirect_uri = this.configService.get<string>(
      'LINKEDIN_REDIRECT_URI',
    );

    const url: string =
      `${OauthBaseUrl.linkedin.outhBaseUrl}/authorization?` +
      `response_type=code&` +
      `client_id=${encodeURIComponent(client_id || '')}&` +
      `redirect_uri=${encodeURIComponent(redirect_uri || '')}&` +
      `scope=${scope}&`;

    return url;
  }

  authCallback(code: string) {
    const client_id = this.configService.get<string>('LINKEDIN_CLIENT_ID');
    const redirect_uri = this.configService.get<string>(
      'LINKEDIN_REDIRECT_URI',
    );
    const client_secret = this.configService.get<string>('LINKEDIN_SECRET_KEY');

    // Exchange code for access token
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirect_uri,
      client_id: client_id,
      client_secret: client_secret,
    });

    const tokenResp = await fetch(
      `${OauthBaseUrl.linkedin.outhBaseUrl}/accessToken`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      },
    );

    if (!tokenResp.ok) {
      const errText = await tokenResp.text();
      return res.status(400).send(`Token exchange failed: ${errText}`);
    }

    const tokenJson = await tokenResp.json();
    const accessToken = tokenJson.access_token as string;

    // After you get accessToken
    const userinfoResp = await fetch(
      `${OauthBaseUrl.linkedin.apiUrl}/userinfo`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    const userinfo = await userinfoResp.json();

    // await saveToken({
    //   email: userinfo.email,
    //   access_token: tokenJson.access_token,
    //   expires_in: tokenJson.expires_in,
    //   refresh_token: tokenJson.refresh_token,
    //   refresh_token_expires_in: tokenJson.refresh_token_expires_in,
    // });

    return { token: tokenJson, userinfo };
  }
}
