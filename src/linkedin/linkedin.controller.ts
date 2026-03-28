import { Controller, Get, Req, Res } from '@nestjs/common';
import { LinkedinService } from './linkedin.service';
import { type Request, type Response } from 'express';

@Controller('linkedin')
export class LinkedinController {
  constructor(private readonly linkedinService: LinkedinService) {}

  @Get('/auth')
  getLinkedinAuthUrl(@Res() res: Response) {
    const url: string = this.linkedinService.getAuthUrl();
    res.redirect(url);
  }

  @Get('/callback')
  callbackLinkedin(@Req() req: Request) {
    const codeParam = req.query.code as string | string[] | undefined;
    const code = Array.isArray(codeParam) ? codeParam[0] : codeParam;

    return codeParam;
  }
}
