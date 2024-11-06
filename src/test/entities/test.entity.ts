import { Question } from 'src/question/entities/question.entity';
import { Result } from 'src/result/entities/result.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Test {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  year: number;

  @OneToMany(() => Question, (question) => question.test)
  questions: Question[];

  @OneToMany(() => Result, (result) => result.test)
  results: Result[];
}
