import { IsString, IsInt } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  answer: string;

  @IsInt()
  order: number;

  @IsString()
  testId: string;
}
