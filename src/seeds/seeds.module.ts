import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/user/entities/user.entity';
import { RoleSeed } from './seed/roles.seed';
import { UserSeed } from './seed/user.seed';
import { SeedController } from './seeds.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Role, User])],
  providers: [RoleSeed, UserSeed],
  controllers: [SeedController],
})
export class SeedsModule {}
