import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { BaseUserDto, CreateUserDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { EntityManager, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Bot } from 'src/database/entities/bot.entity';
import { access } from 'fs';

@Injectable()
export class AuthService {
  constructor (
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Bot)
    private readonly botRepository: Repository<Bot>,
    private readonly jwtService: JwtService,
    private readonly entityManager: EntityManager,
  ) {}

  async user_register(createUserDto: CreateUserDto) {
    const { password, username, email } = createUserDto;

    const emailInUse = await this.userRepository.findOne({
      where: {email: email}
    });
    if (emailInUse) {
      throw new BadRequestException(
        'Email alreday in use'
      )
    }
    const hashedPassword = bcrypt.hash(password, 10);
    const user = new User({
      username: username, 
      email: email,
      password: await hashedPassword
    });
    await this.entityManager.save(user);
    return { 
      accessToken: await this.generateUserToken(user.id),
      bots: 0
    };
  }

  async user_login(baseUserDto: BaseUserDto) {
    const { email, password } = baseUserDto;

    const user = await this.userRepository.findOne({
      where: { email: email }
    });
    if (!user) {
      throw new UnauthorizedException('Wrong credentials')
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      throw new UnauthorizedException('Wrong credentials')
    }

    const bots = await this.botRepository.find({
      where: { user },
      relations: {user: true}
    })

    return {
      accessToken: await this.generateUserToken(user.id),
      bots: bots
    };
  }


  async generateUserToken (userID) {
    const accessToken = this.jwtService.signAsync({ userID }, {expiresIn: '1h'});
    return await accessToken;
  }
}
