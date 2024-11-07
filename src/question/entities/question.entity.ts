import { Test } from 'src/test/entities/test.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  answer: string;

  @Column()
  order: number;

  @ManyToOne(() => Test, (test) => test.questions)
  test: Test;
}
