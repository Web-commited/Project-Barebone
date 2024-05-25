import { Controller, Request, Post,Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Request() req) {
    console.log(req.body.user);
    return this.authService.validateUser(req.body.user.username, req.body.user.password);
  }
  @Get('hello')
    async getHello(): Promise<string> {
        return 'Hello World!';
    }
}
