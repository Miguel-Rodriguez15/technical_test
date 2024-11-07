import { Injectable } from '@nestjs/common';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from './entities/result.entity';
import { UserService } from 'src/user/user.service';
import { TestService } from 'src/test/test.service';
import { QuestionService } from 'src/question/question.service';

@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(Result)
    private readonly resultRepository: Repository<Result>,
    private readonly studentService: UserService,
    private readonly testService: TestService,
    private readonly questionService: QuestionService,
  ) {}

  async create(createResultDto: CreateResultDto): Promise<Result> {
    const user = await this.studentService.findOne(createResultDto.studentId);
    if (typeof user === 'string') {
      throw new Error(user);
    }

    const test = await this.testService.findOne(createResultDto.testId);
    if (typeof test === 'string') {
      throw new Error(test);
    }

    const question = await this.questionService.findOne(
      createResultDto.questionId,
    );
    if (typeof question === 'string') {
      throw new Error(question);
    }

    const result = this.resultRepository.create({
      user,
      test,
      question,
      answer: createResultDto.answer,
    });

    return this.resultRepository.save(result);
  }

  findAll() {
    return this.resultRepository.find({
      relations: ['user', 'test', 'question'],
    });
  }

  async findByUserAndTest(userId: string, testId: string) {
    try {
      const results = await this.resultRepository.find({
        where: {
          user: { id: userId },
          test: { id: testId },
        },
        relations: ['user', 'test', 'question'],
      });

      if (!results.length) {
        throw new Error('No results found for the given user and test IDs.');
      }

      return results;
    } catch (error) {
      throw new Error(`Error fetching results: ${error.message}`);
    }
  }

  findOne(id: string) {
    return this.resultRepository.findOne({
      where: { id },
      relations: ['user', 'question', 'test'],
    });
  }
}
