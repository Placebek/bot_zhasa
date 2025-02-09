import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BaseUserDto, CreateUserDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.user_register(createUserDto);
  }

  @Post('login')
  async login(@Body() baseUserDto: BaseUserDto) {
    return this.authService.user_login(baseUserDto);
  }
}
