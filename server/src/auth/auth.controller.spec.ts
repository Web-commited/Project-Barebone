import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../user/user.service';
import { HttpException } from '@nestjs/common';

// Mock UsersService
class UsersServiceMock {
  async findOneByUsername(username: string) {
    if (username === 'testuser') {
      return { id: 1, username: 'testuser', password: 'password' };
    }
    return null;
  }
}

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, { provide: UsersService, useClass: UsersServiceMock }],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });


  describe('login', () => {
    it('should return access token if credentials are valid', async () => {
      const req = { body: { username: 'testuser', password: 'password' } };
      const result = await authController.login(req);
      expect(result).toHaveProperty('access_token');
    });

    it('should throw HttpException if credentials are invalid', async () => {
      const req = { body: { username: 'invaliduser', password: 'invalidpassword' } };
      await expect(authController.login(req)).rejects.toThrowError(HttpException);
    });
  });
});
