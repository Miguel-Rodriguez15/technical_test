import { Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Test)
    private readonly testRepository: Repository<Test>,
  ) {}
  async createTest(createTestDto: CreateTestDto): Promise<Test> {
    const test = this.testRepository.create(createTestDto);
    return await this.testRepository.save(test);
  }

  findAll() {
    return `This action returns all test`;
  }

  async findOne(id: string) {
    try {
      const test = await this.testRepository.findOne({ where: { id } });
      if (!test) {
        return `id test not fund ${test}`;
      }
      return test;
      throw new Error('test not found');
    } catch (error) {
      console.log(error);
    }
  }

  update(id: number, updateTestDto: UpdateTestDto) {
    return `This action updates a #${id} test`;
  }

  remove(id: number) {
    return `This action removes a #${id} test`;
  }
}
