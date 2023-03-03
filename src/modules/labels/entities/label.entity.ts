import { App } from 'src/modules/apps/entities/app.entity';
import { User } from 'src/modules/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Label {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 30 })
  name: string;

  @Column('varchar', { comment: '介绍', length: 50 })
  info: string;

  @ManyToOne(() => User)
  creator: User;

  @ManyToMany(() => App)
  apps: App;

  @CreateDateColumn({ name: 'create_date', select: false })
  createDate: Date;

  @UpdateDateColumn({ name: 'update_date', select: false })
  UpdateDate: Date;
}
