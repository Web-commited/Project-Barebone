import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

// Mock UsersService
class UsersServiceMock {
  async findOneByUsername(username: string) {
    if (username === 'testuser') {
      return { id: 1, username: 'testuser', password: await bcrypt.hash('password', 10) };
    }
    return null;
  }
}

// Mock JwtService
class JwtServiceMock {
  sign(payload: any): string {
    return 'mocked-token';
  }
}

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useClass: UsersServiceMock },
        { provide: JwtService, useClass: JwtServiceMock },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return access token if credentials are valid', async () => {
      const result = await authService.validateUser('testuser', 'password');
      expect(result).toHaveProperty('access_token');
    });

    it('should throw HttpException if credentials are invalid', async () => {
      await expect(authService.validateUser('invaliduser', 'invalidpassword')).rejects.toThrowError(HttpException);
    });
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const result = await authService.login({ id: 1, username: 'testuser' });
      expect(result).toHaveProperty('access_token', 'mocked-token');
    });
  });
});
