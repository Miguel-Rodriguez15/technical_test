import { IsString, IsInt } from 'class-validator';

export class CreateTestDto {
  @IsString()
  name: string;

  @IsInt()
  year: number;
}
