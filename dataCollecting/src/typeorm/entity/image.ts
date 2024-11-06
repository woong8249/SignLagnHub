// entity/groupCode.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Group } from './group';

@Entity({ name: 'tn_img' })
export class Image {
    @JoinColumn({ name: 'grp_id', referencedColumnName: 'id' })
    @ManyToOne(() => Group, group => group.images)
    group: Group;

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'bucket_nm', type: 'varchar', length: 50 })
    bucketName: string;

    @Column({ name: 'obj_nm', type: 'varchar', length: 50 })
    objectName: string;

    @Column({ name: 'rmrk', type: 'varchar', length: 100 })
    remark: string;

    @CreateDateColumn({ name: 'reg_dt', type: 'timestamp' })
    regisDate: Date;

    @UpdateDateColumn({ name: 'upd_dt', type: 'timestamp' })
    updateDate: Date;
}
