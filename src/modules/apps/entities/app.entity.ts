import { Label } from 'src/modules/labels/entities/label.entity';
import { User } from 'src/modules/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class App {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 30 })
  name: string;

  @ManyToOne(() => Label)
  @JoinTable({
    name: 'app_label',
  })
  label: Label;

  @Column('varchar', { comment: '介绍', length: 50 })
  info: string;

  @Column('varchar', { length: 500 })
  url: string;

  @Column('varchar', { length: 500 })
  avatar: string;

  @ManyToOne(() => User)
  creator: User;

  @CreateDateColumn({ name: 'create_date' })
  createDate: Date;

  @UpdateDateColumn({ name: 'update_date' })
  UpdateDate: Date;
}
