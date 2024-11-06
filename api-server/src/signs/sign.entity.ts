// entity/sign.ts
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Definition } from '../definitions/definition.entity';
import { Group } from '../groups/group.entity';
import { User } from '../users/user.entity';

@Entity({ name: 'tn_sign' })
export class Sign {
  @JoinColumn({ name: 'grp_id', referencedColumnName: 'id' })
  @ManyToOne(() => Group, (group) => group.signs)
  group: Group;

  @PrimaryGeneratedColumn()
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
