import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  @Get('profile')
  @UseGuards(AuthGuard('basic'))  
  getProfile(@Request() req) {
    return req.user;  
  }
}
