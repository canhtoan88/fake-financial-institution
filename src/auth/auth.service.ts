import { Injectable } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  login(loginDto: LoginDto) {
    const { password, username } = loginDto;

    if (username !== 'admin' || password !== 'test') {
      return null;
    }

    return {
      access_token: 'access_token',
      token_type: 'bearer',
    };
  }
}
