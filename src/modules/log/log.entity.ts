import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('operationlog')
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'table_name', comment: '操作表', length: 50 })
  tableName: string;

  @Column({ name: 'table_id', comment: '主键id' })
  tableId: bigint;

  @Column({ comment: '操作类型: 0 add, 1 modify, 2 delete' })
  type: number;

  @Column({ name: 'old_data', comment: '旧数据', length: 1000 })
  oldData: string;

  @Column({ name: 'new_data', comment: '新数据', length: 1000 })
  newData: string;

  @Column({ name: 'cost_time', default: 0, comment: '操作耗时' })
  costTime: number;

  @Column({ name: 'ip_addr', length: 100 })
  ipAddr: string;

  @Column('varchar', { comment: '操作人', length: 100 })
  operator: string;

  @CreateDateColumn({ name: 'create_time', comment: '创建时间' })
  createTime: string;
}
