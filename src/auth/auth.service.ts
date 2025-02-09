import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { BaseUserDto, CreateUserDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { EntityManager, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor (
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, 
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
    return this.generateUserToken(user.id);
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

    return this.generateUserToken(user.id);
  }


  async generateUserToken (userID) {
    const accessToken = this.jwtService.sign({ userID }, {expiresIn: '1h'});
    return { 
      accessToken, 
    };
  }
}
