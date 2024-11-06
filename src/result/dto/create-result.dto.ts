import { IsString } from 'class-validator';

export class CreateResultDto {
  @IsString()
  studentId: string;

  @IsString()
  testId: string;

  @IsString()
  questionId: string;

  @IsString()
  answer: string;
}
