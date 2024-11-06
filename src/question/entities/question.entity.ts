import { Test } from 'src/test/entities/test.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  answer: string;

  @Column()
  order: number;

  @ManyToOne(() => Test, (test) => test.questions)
  test: Test;
}
