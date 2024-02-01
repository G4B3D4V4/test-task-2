import { User } from '@app/database';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserRequest } from './dto/create-user-request.dto';
import { GetUserResponse } from './dto/get-user-response.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async create(params: CreateUserRequest): Promise<GetUserResponse> {
    try {
      const foundUser = await this.userModel.findOne({ where: { email: params.email } });

      if (foundUser) throw new ConflictException('User with this email already exists');

      const createUser = { ...params, ...new User() };

      const result = this.removePassword((await this.userModel.create(createUser)).get());

      return result;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<GetUserResponse> {
    try {
      const user = await this.userModel.findOne({ where: { id } });

      if (!user) throw new NotFoundException('User not found');

      return this.removePassword(user.get());
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ where: { email } });
  }

  private removePassword(user: User): GetUserResponse {
    const { password, deletedAt, ...result } = user;
    return result;
  }
}
