import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Customer } from '../entities/customer.entity';
import { Repository } from 'typeorm';

describe('AuthService', () => {
  let service: AuthService;
  let customerRepository: Repository<Customer>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(Customer),
          useValue: { findOne: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    customerRepository = module.get(getRepositoryToken(Customer));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should cannot logged in', () => {
    expect(service.login({ username: 'admin', password: 'password' })).toEqual(
      null,
    );
  });

  it('should be return access token if login successfully', () => {
    expect(service.login({ username: 'admin', password: 'test' })).toEqual({
      access_token: 'access_token',
      token_type: 'bearer',
    });
  });
});
