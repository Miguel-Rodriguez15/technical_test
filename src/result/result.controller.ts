import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ResultService } from './result.service';
import { CreateResultDto } from './dto/create-result.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('result')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Post('register')
  @ApiOperation({ summary: 'Create a new  result' })
  @ApiResponse({
    status: 201,
    description: 'The result has been successfully created.',
    type: CreateResultDto,
  })
  registerResult(@Body() createResultDto: CreateResultDto) {
    return this.resultService.create(createResultDto);
  }

  @Get()
  @ApiOperation({ summary: 'Search all result' })
  @ApiResponse({
    status: 201,
    description: 'The result has been found.',
  })
  findAll() {
    return this.resultService.findAll();
  }

  @Get('searchAResult/:id')
  @ApiOperation({ summary: 'Search a result' })
  @ApiResponse({
    status: 201,
    description: 'The result has been found.',
  })
  findOne(@Param('id') id: string) {
    return this.resultService.findOne(id);
  }

  @Get('/search')
  @ApiOperation({ summary: 'Search result from a user and a test' })
  @ApiResponse({
    status: 201,
    description: 'The result has been found.',
  })
  async findByUserAndTest(
    @Query('userId') userId: string,
    @Query('testId') testId: string,
  ) {
    try {
      console.log(`Searching for user ID: ${userId} and test ID: ${testId}`);
      return await this.resultService.findByUserAndTest(userId, testId);
    } catch (error) {
      console.error('Error fetching results:', error);
      throw new Error('Error fetching results');
    }
  }
}
