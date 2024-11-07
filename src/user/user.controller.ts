import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register/student')
  @ApiOperation({ summary: 'Create a new  student' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: CreateUserDto,
  })
  async createStudent(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Search all students' })
  @ApiResponse({
    status: 201,
    description: 'The student has been found.',
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a student' })
  @ApiResponse({
    status: 201,
    description: 'Student has been found.',
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Get('found/:id/tests')
  @ApiOperation({ summary: 'Search test for a user' })
  @ApiResponse({
    status: 201,
    description: 'Tests found',
  })
  async findTestsByUserId(@Param('id') userId: string) {
    return this.userService.findTestsByUserId(userId);
  }
}
