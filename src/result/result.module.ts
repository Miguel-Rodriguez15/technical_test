import { Module } from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Result } from './entities/result.entity';
import { UserModule } from 'src/user/user.module';
import { TestModule } from 'src/test/test.module';
import { QuestionModule } from 'src/question/question.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Result]),
    UserModule,
    TestModule,
    QuestionModule,
  ],
  controllers: [ResultController],
  providers: [ResultService],
})
export class ResultModule {}
