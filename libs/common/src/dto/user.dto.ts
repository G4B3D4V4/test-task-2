import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserDto {
  @ApiProperty({ type: Number, description: 'User id' })
  id: number;

  @ApiProperty({ type: String, description: 'User name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String, description: 'User email' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, description: 'User password' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ type: String, description: 'User phone' })
  @IsString()
  phone: string;

  @ApiPropertyOptional({ type: Date, description: 'created at' })
  @IsOptional()
  createdAt: Date;

  @ApiPropertyOptional({ type: Date, description: 'created at' })
  @IsOptional()
  updatedAt: Date;
}
