import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { ValidationModule } from 'src/validation/validation.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [AuthModule, ValidationModule],
  exports: [UserService],
})
export class UserModule {}
