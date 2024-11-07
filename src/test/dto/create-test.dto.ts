import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, MinLength } from 'class-validator';

export class CreateTestDto {
  @ApiProperty({
    description: 'Name of the test you wish to register',
    example: 'math',
  })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({
    description: 'Year to which the test will belong',
    example: '2025',
  })
  @IsInt()
  @MinLength(1)
  year: number;
}
