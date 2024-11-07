import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';

@Injectable()
export class UserSeed {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly dataSource: DataSource,
  ) {}

  async run() {
    await this.dataSource.query('SET FOREIGN_KEY_CHECKS = 0');
    await this.dataSource.query('DELETE FROM user_roles');
    await this.dataSource.query('TRUNCATE TABLE users');
    await this.dataSource.query('SET FOREIGN_KEY_CHECKS = 1');

    const student = await this.roleRepository.findOne({
      where: { name: 'student' },
    });
    const admin = await this.roleRepository.findOne({
      where: { name: 'admin' },
    });

    const users = [
      {
        email: 'user@gmail.com',
        password: bcrypt.hashSync('Abc1234#', 10),
        fullName: 'User',
        isActive: true,
        roles: [student],
        document: '1',
        grade: '1',
        classroom: '22',
      },
      {
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('Abc1234#', 10),
        fullName: 'Admin User',
        isActive: true,
        roles: [admin],
        document: '1',
        grade: '1',
        classroom: '22',
      },
    ];

    await this.userRepository.save(users);

    return {
      message: 'Users have been reset and new users created successfully',
    };
  }
}
