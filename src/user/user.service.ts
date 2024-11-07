import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/roles/entities/role.entity';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { ValidationService } from 'src/validation/validation.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly validationService: ValidationService,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    try {
      const { password, roles, ...userData } = createUserDto;

      const userRoles = await this.roleRepository.find({
        where: {
          name: In(roles && roles.length > 0 ? roles : ['student']),
        },
      });

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
        roles: userRoles,
      });

      await this.userRepository.save(user);
      delete user.password;
      return { token: this.getJwtToken({ id: user.id }) };
    } catch (error) {
      await this.validationService.handleDBrrors(error);
    }
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        return `id user not fund ${user}`;
      }
      return user;
      throw new Error('test not found');
    } catch (error) {
      throw new Error(error);
    }
  }

  async findTestsByUserId(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['results', 'results.test'],
    });

    if (!user) {
      throw new Error(`User with ID ${userId} not found.`);
    }

    const uniqueTestIds = new Set<string>();

    user.results.forEach((result) => {
      if (result.test) {
        uniqueTestIds.add(result.test.id);
      }
    });

    const uniqueTests = Array.from(uniqueTestIds).map(
      (testId) => user.results.find((result) => result.test.id === testId).test,
    );

    return uniqueTests;
  }
}
