import { UserDto } from '@app/common';
import { OmitType } from '@nestjs/swagger';

export class GetUserResponse extends OmitType(UserDto, ['password']) {}
