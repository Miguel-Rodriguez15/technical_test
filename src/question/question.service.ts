import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import { TestService } from 'src/test/test.service';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,

    private readonly testService: TestService,
  ) {}
  async createQuestion(createQuestionDto: CreateQuestionDto) {
    const test = await this.testService.findOne(createQuestionDto.testId);

    if (!test) {
      throw new Error(`Test con ID ${createQuestionDto.testId} no encontrado`);
    }

    const question = this.questionRepository.create({
      ...createQuestionDto,
      test: { id: createQuestionDto.testId },
    });

    return await this.questionRepository.save(question);
  }

  findAll() {
    return `This action returns all question`;
  }

  async findOne(id: string) {
    try {
      const question = await this.questionRepository.findOne({ where: { id } });
      if (!question) {
        return `id question not fund ${question}`;
      }
      return question;
      throw new Error('test not found');
    } catch (error) {
      throw new Error(error);
    }
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
