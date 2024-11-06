import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Group } from '../groups/group.entity';

@Entity({ name: 'tn_img' })
export class Image {
  @JoinColumn({ name: 'grp_id', referencedColumnName: 'id' })
  @ManyToOne(() => Group, (group) => group.images)
  group: Group;

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'obj_url', type: 'varchar', length: 255 })
  objectUrl: string;

  @Column({ name: 'rmrk', type: 'varchar', length: 100 })
  remark: string;

  @CreateDateColumn({ name: 'reg_dt', type: 'timestamp' })
  regisDate: Date;

  @UpdateDateColumn({ name: 'upd_dt', type: 'timestamp' })
  updateDate: Date;
}
