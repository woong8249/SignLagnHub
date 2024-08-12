// entity/definition
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  // PrimaryGeneratedColumn,
} from 'typeorm';

import { Group } from '../groups/group.entity';
import { Sign } from '../signs/sign.entity';
import { User } from '../users/user.entity';

@Entity('tn_def')
export class Definition {
  @JoinColumn({ name: 'grp_cd', referencedColumnName: 'id' })
  @ManyToOne(() => Group, (group) => group.signs)
  group: Group;

  @JoinColumn([{ name: 'sign_id', referencedColumnName: 'id' }])
  @ManyToOne(() => Sign, (sign) => sign.definitions)
  sign: Sign;

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'reg_dt', type: 'timestamp' })
  definition: string;

  @Column({ name: 'ref_word', type: 'varchar', length: 50 })
  referenceWord: string;

  @ManyToOne(() => User, (user) => user.signDefinitions)
  @JoinColumn({ name: 'reg_by', referencedColumnName: 'id' })
  register: User;

  @Column({ name: 'reg_dt', type: 'timestamp' })
  regisDate: Date;

  @Column({ name: 'upd_dt', type: 'timestamp' })
  updateDate: Date;
}
