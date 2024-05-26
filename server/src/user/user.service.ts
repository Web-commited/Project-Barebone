import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  findOneByUsername(username: string): Promise<User> {
    return this.usersRepository.findOne({where: {username}});
  }

  findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({where: {email}})
  }
  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  async updateByUsername(username: string, userData: Partial<User>): Promise<User> {
    const user = await this.findOneByUsername(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, userData);
    
    return this.usersRepository.save(user);
  }
  
}
