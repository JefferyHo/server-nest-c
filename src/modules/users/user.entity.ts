import { encrypt } from 'src/utils/encrypt';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, name: 'user_name' })
  userName: string;

  @Column({ length: 100, name: 'user_pwd', select: false })
  userPwd: string;

  @Column({ length: 50, default: '' })
  email: string;

  @Column({ length: 50, nullable: true })
  phone: string;

  @Column('int', {
    default: 1,
    comment: '账号状态: 0:待开通, 1:正常, 2:停用',
  })
  status: number;

  @Column({ length: 512, nullable: true })
  description: string;

  @Column('int', {
    default: 0,
    name: 'is_delete',
    comment: '删除状态： 0:未删除， 1: 已删除',
  })
  isDelete: number;

  @CreateDateColumn({ name: 'create_time' })
  createTime: Date;

  @UpdateDateColumn({ name: 'update_time' })
  updateTime: Date;

  @BeforeInsert()
  async encryptPwd() {
    this.userPwd = await encrypt(this.userPwd);
  }
}
