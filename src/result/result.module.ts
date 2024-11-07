import { Module } from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Result } from './entities/result.entity';
import { UserModule } from 'src/user/user.module';
import { TestModule } from 'src/test/test.module';
import { QuestionModule } from 'src/question/question.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Result]),
    UserModule,
    TestModule,
    QuestionModule,
    AuthModule,
  ],
  controllers: [ResultController],
  providers: [ResultService],
})
export class ResultModule {}
