import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post('register/question')
  @ApiOperation({ summary: 'Create a new  question' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: CreateQuestionDto,
  })
  registerQuestion(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.createQuestion(createQuestionDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Search a question' })
  @ApiResponse({
    status: 201,
    description: 'The question has been found',
  })
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(id);
  }

  @Get('test/:testId')
  @ApiOperation({ summary: 'Search a question' })
  @ApiResponse({
    status: 201,
    description: 'The question has been found',
  })
  async findAllByTestId(@Param('testId') testId: string) {
    return this.questionService.findAllByTestId(testId);
  }
}
