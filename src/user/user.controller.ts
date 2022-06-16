import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from 'src/guard';

@Controller('user')
export class UserController {
  @UseGuards(JwtGuard)
  @Get('profile')
  getProfile(@Req() request: Request) {
    return { userDatas: request.user };
  }
}
