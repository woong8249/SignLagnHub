import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { GroupCode } from './groupCode';
import { SignTypeCode } from './signTypeCode';

@Entity({ name: 'tn_sign_polysemy' })
export class SignPolysemy {
  // PK
  @PrimaryGeneratedColumn({ name: 'polysemy_id' })
  id: number;

  // FK
  @JoinColumn({ name: 'grp_cd' })
  @ManyToOne(() => GroupCode, group => group.signPolysemies)
  groupCode: GroupCode;

  // FK
  @JoinColumn({ name: 'type_cd' })
  @ManyToOne(() => SignTypeCode, type => type.signPolysemies)
  typeCode:SignTypeCode;

  @Column('varchar', { name: 'rmrk', length: 100 })
  remark: string;

  @Column('timestamp', { name: 'reg_dt' })
  regisDate: Date;

  @Column('timestamp', { name: 'upd_dt' })
  updateDate: Date;
}
