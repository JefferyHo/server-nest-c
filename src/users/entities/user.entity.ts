import { IsEmail, IsIn, IsNotEmpty, IsMobilePhone } from 'class-validator';
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

  @Column({ length: 50 })
  email: string;

  @Column({ length: 50, nullable: true })
  phone: string;

  // 账号状态： 0:待开通，1:正常，2:停用
  @IsIn([0, 1, 2], {
    message: 'invalid status value',
  })
  @Column('int', { default: 1 })
  status: number;

  @Column({ length: 512, nullable: true })
  description: string;

  // 删除状态： 0:未删除， 1: 已删除
  @Column('int', { default: 0, name: 'is_delete' })
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
