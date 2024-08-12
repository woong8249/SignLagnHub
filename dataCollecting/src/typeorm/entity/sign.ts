import {
  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,

} from 'typeorm';

import { Definition } from './definition';
import { Group } from './group';
import { User } from './user';

@Entity({ name: 'tn_sign' })
export class Sign {
  @JoinColumn({ name: 'grp_id', referencedColumnName: 'id' })
  @ManyToOne(() => Group, group => group.signs)
  group: Group;

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'video_url', type: 'varchar', length: 255 })
  videoUrl: string;

  @ManyToOne(() => User, user => user.signs)
  @JoinColumn({ name: 'reg_by', referencedColumnName: 'id' })
  register: User;

  @CreateDateColumn({ name: 'reg_dt', type: 'timestamp' })
  regisDate: Date;

  @UpdateDateColumn({ name: 'upd_dt', type: 'timestamp' })
  updateDate: Date;

  @OneToMany(() => Definition, def => def.sign, { cascade: true })
  definitions: Definition[];
}
