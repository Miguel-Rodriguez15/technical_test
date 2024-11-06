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
    return `This action returns all result`;
  }

  findOne(id: number) {
    return `This action returns a #${id} result`;
  }

  update(id: number, updateResultDto: UpdateResultDto) {
    return `This action updates a #${id} ${updateResultDto}result`;
  }

  remove(id: number) {
    return `This action removes a #${id} result`;
  }
}
