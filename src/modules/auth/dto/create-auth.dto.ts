import { IsEmail, isString, IsString, Matches, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*[0-9])/, {message: 
      'Password must contain at least one number'
  })
  password: string;

  @IsEmail()
  email: string;
}


export class BaseUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*[0-9])/, {message: 
      'Password must contain at least one number'
  })
  password: string;
}
