import { User } from 'src/user/entities/user.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255, unique: true })
  name: string;

  @ManyToMany(() => User, (user) => user.roles, { cascade: ['remove'] })
  users: User[];
}
