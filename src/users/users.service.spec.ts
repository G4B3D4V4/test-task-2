import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from '@app/database';
import { getModelToken } from '@nestjs/sequelize';

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: any;
  const mockRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, { provide: getModelToken(User), useValue: mockRepository }],
    }).compile();

    service = module.get<UsersService>(UsersService);
    usersRepository = module.get(getModelToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
