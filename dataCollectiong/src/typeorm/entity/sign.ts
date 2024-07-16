// entity/sign.ts
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Definition } from './definition';
import { GroupCode } from './groupCode';
import { User } from './user';

@Entity({ name: 'tn_sign' })
export class Sign {
  @ManyToOne(() => GroupCode, group => group.signs)
  @JoinColumn({ name: 'grp_cd', referencedColumnName: 'code' })
  groupCode: GroupCode;

  @PrimaryGeneratedColumn({ name: 'sign_id' })
  id: number;

  @Column({ name: 'video_url', type: 'varchar', length: 255 })
  videoUrl: string;

  @ManyToOne(() => User, user => user.signs)
  @JoinColumn({ name: 'reg_by', referencedColumnName: 'id' })
  register: string;

  @Column({ name: 'reg_dt', type: 'timestamp' })
  regisDate: Date;

  @Column({ name: 'upd_dt', type: 'timestamp' })
  updateDate: Date;

  @OneToMany(() => Definition, def => def.signId, { cascade: true })
  definitions: Definition[];
}
