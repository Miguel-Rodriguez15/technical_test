import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
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
      throw new Error(`Test with ID ${createQuestionDto.testId} not found`);
    }

    const question = this.questionRepository.create({
      ...createQuestionDto,
      test: { id: createQuestionDto.testId },
    });

    return await this.questionRepository.save(question);
  }

  async findOne(id: string) {
    try {
      const question = await this.questionRepository.findOne({ where: { id } });

      if (!question) {
        throw new Error(`Question with ID ${id} not found`);
      }

      return question;
    } catch (error) {
      throw new Error(`Error finding question: ${error.message}`);
    }
  }

  async findAllByTestId(testId: string) {
    const test = await this.testService.findOne(testId);

    if (!test) {
      throw new Error(`Test with ID ${testId} not found`);
    }

    const questions = await this.questionRepository.find({
      where: { test: { id: testId } },
    });

    if (questions.length === 0) {
      return `No questions found for test with id ${testId}`;
    }

    return questions;
  }
}
