import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginDto } from './dto/login.dto';
import { AccessTokenResponseDto } from './dto/access-token-response.dto';

@ApiTags('Auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login. Public(token is not required).' })
  @ApiCreatedResponse({
    description: 'jwt token',
    type: AccessTokenResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() _receivedUser: LoginDto, @Request() { user }) {
    return await this.authService.login(user);
  }
}
