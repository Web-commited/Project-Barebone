import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { JwtService } from '@nestjs/jwt'; 
import { jwtConstants } from './constants';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secretOrPrivateKey: jwtConstants.secret,
        signOptions: { expiresIn: '60m' },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtService], 
  exports: [AuthService],
})
export class AuthModule {}
