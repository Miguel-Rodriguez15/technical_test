import { Question } from 'src/question/entities/question.entity';
import { Test } from 'src/test/entities/test.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Result {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.results)
  user: User;

  @ManyToOne(() => Test, (test) => test.results)
  test: Test;

  @ManyToOne(() => Question)
  question: Question;

  @Column()
  answer: string;
}
