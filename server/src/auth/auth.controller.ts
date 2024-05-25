import { Controller, Request, Post,Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Request() req) {

    return this.authService.validateUser(req.body.username, req.body.password);
  }
  @Get('hello')
    async getHello(): Promise<string> {
        return 'Hello World!';
    }
}
