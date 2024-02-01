import { Body, Controller, Get, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserRequest } from './dto/create-user-request.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUserResponse } from './dto/get-user-response.dto';

@ApiTags('Users')
@Controller('api/v1/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User is created',
    type: GetUserResponse,
  })
  @Post()
  async create(@Body() body: CreateUserRequest) {
    return this.usersService.create(body);
  }

  @ApiOperation({ summary: 'Get user by id, should have token' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User is found', type: GetUserResponse })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth('jwt-token')
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<GetUserResponse> {
    return this.usersService.findOne(+id);
  }
}
