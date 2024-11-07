import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorater';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Auth()
  @Post('register/test')
  @ApiOperation({ summary: 'Search all students' })
  @ApiResponse({
    status: 201,
    description: 'The student has been found.',
    type: CreateTestDto,
  })
  registerTest(@Body() createTestDto: CreateTestDto) {
    return this.testService.createTest(createTestDto);
  }

  @Auth()
  @Get()
  @ApiOperation({ summary: 'Search all tests' })
  @ApiResponse({
    status: 201,
    description: 'Tests have been found',
    type: CreateTestDto,
  })
  findAll() {
    return this.testService.findAll();
  }

  @Auth()
  @Get(':id')
  @ApiOperation({ summary: 'Search a test' })
  @ApiResponse({
    status: 201,
    description: 'Test have been found',
    type: CreateTestDto,
  })
  findOne(@Param('id') id: string) {
    return this.testService.findOne(id);
  }
}
