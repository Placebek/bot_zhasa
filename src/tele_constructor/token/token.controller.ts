import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Token } from './token.model'; 
import { CreateTokenDto } from '../dto/create-token.dto';
import { BotConstuctor } from '../bot/bot-config.service'; 

@Controller('tokens')
export class TokenController {
  constructor(private readonly botConstructor: BotConstuctor) {}

  @UseGuards(AuthGuard('basic'))
  @Post()
  async createToken(@Body() createTokenDto: CreateTokenDto): Promise<Token> {
    const token = await Token.create(createTokenDto as any);
    await this.botConstructor.getMainPyCode(token.telegram_id); 
    return token;
  }
}
