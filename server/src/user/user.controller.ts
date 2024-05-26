import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from './user.entity';
import { hash } from 'bcryptjs';
import { NotFoundException, ConflictException} from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('username/:username')
  findOneByUsername(@Param('username') username: string): Promise<User> {
    return this.usersService.findOneByUsername(username);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':username')
  async update(@Param('username') username: string, @Body() userData: Partial<User>): Promise<User> {
    return this.usersService.updateByUsername(username, userData);
  }
  
  @Post()
  async create(@Body() user: User): Promise<User> {
    const existingUser = await this.usersService.findOneByUsername(user.username);
    if (existingUser) {
      throw new ConflictException('Username is already taken');
    }
    user.password = await hash(user.password, 10);
    return this.usersService.create(user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}
