import { UserDto } from '@app/common';
import { OmitType } from '@nestjs/swagger';

export class CreateUserRequest extends OmitType(UserDto, ['id']) {}
