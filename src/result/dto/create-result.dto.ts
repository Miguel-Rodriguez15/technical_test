import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateResultDto {
  @ApiProperty({
    description:
      'student identifier in this case is the id of the user table, only uuid values are allowed.',
    example: 'b66e4ace-39a9-40fc-843c-805e8329a0bd',
  })
  @IsString()
  @MinLength(1)
  studentId: string;

  @ApiProperty({
    description:
      'test identifier in this case is the id of the test table only uuid values are allowed.',
    example: '266e4ace-39a9-40fc-843c-805e8329a0b312',
  })
  @IsString()
  @MinLength(1)
  testId: string;

  @ApiProperty({
    description:
      'identifier of the question in this case is the id of the test table only values of type uuid.answer are allowed.',
    example: '263236e4ace-39a9-40fc-843c-805e8329a0b31ed2',
  })
  @IsString()
  @MinLength(1)
  questionId: string;

  @ApiProperty({
    description:
      'answer that the student believes to be correct to the question',
    example: 'B',
  })
  @IsString()
  @MinLength(1)
  answer: string;
}
