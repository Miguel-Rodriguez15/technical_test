import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
  create(createRoleDto: CreateRoleDto) {}
}
