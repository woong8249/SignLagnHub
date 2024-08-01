// entity/sign.ts
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

import { Definition } from '../definitions/definition.entity';
import { GroupCode } from '../group-codes/group-code.entity';
import { User } from '../users/user.entity';

@Entity({ name: 'tn_sign' })
export class Sign {
  @PrimaryColumn({ name: 'grp_cd', type: 'varchar', length: 2 })
  @JoinColumn({ name: 'grp_cd', referencedColumnName: 'code' })
  @ManyToOne(() => GroupCode, (group) => group.signs)
  groupCode: GroupCode;

  @PrimaryColumn({ name: 'sign_id', type: 'int' })
  id: number;

  @Column({ name: 'video_url', type: 'varchar', length: 255 })
  videoUrl: string;

  @ManyToOne(() => User, (user) => user.signs)
  @JoinColumn({ name: 'reg_by', referencedColumnName: 'id' })
  register: User;

  @Column({ name: 'reg_dt', type: 'timestamp' })
  regisDate: Date;

  @Column({ name: 'upd_dt', type: 'timestamp' })
  updateDate: Date;

  @OneToMany(() => Definition, (def) => def.sign, { cascade: true })
  definitions: Definition[];
}
