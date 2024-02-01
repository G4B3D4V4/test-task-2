import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenResponseDto {
  @ApiProperty({ type: String, description: 'Access token' })
  accessToken: string;
}
