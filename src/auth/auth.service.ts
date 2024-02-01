import { UserDto, passwordHash } from '@app/common';
import { User } from '@app/database';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user || !user.password) {
      return null;
    }
    let isPasswordValid = false;

    isPasswordValid = (await passwordHash(password)) === user.password;

    const { password: p, deletedAt, ...result } = user.get();
    return isPasswordValid ? result : null;
  }

  async login(user: User) {
    try {
      const payload = { sub: user.id, user };
      const accessToken = await this.addAccessToken(payload);
      return { accessToken };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async addAccessToken(
    payload: { sub: number; user: UserDto },
    options?: { expiresIn: string },
  ): Promise<string> {
    try {
      const { createdAt, updatedAt, ...rest } = payload.user;

      const preparedPayload = {
        ...payload,
        user: rest,
      };

      const accessToken = this.jwtService.sign(preparedPayload, options);

      return accessToken;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
