import { Controller, Get } from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoleSeed } from './seed/roles.seed';
import { UserSeed } from './seed/user.seed';

@ApiTags('seed')
@Controller('seed')
export class SeedController {
  constructor(
    private readonly roleSeed: RoleSeed,
    private readonly userSeed: UserSeed,
  ) {}

  @Get('roles')
  @ApiOperation({ summary: 'Create seed data for roles' })
  @ApiResponse({
    status: 200,
    description: 'Roles have been successfully seeded.',
  })
  async createRoles() {
    return this.roleSeed.run();
  }

  @Get('users')
  @ApiOperation({ summary: 'Create seed data for users' })
  @ApiResponse({
    status: 200,
    description: 'Users have been successfully seeded.',
  })
  async createUsers() {
    return this.userSeed.run();
  }
}
