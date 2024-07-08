// entity/signTypeCode.ts
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

import { GroupCode } from './groupCode';
import { SignLanguageResource } from './signLanguageResource';
import { SignPolysemy } from './signPolysemy';

@Entity({ name: 'tn_sign_type_cd' })
export class SignTypeCode {
  // PK
  @PrimaryColumn('varchar', { name: 'type_cd', length: 50 })
  typeCode: string;

  // FK
  @ManyToOne(() => GroupCode, group => group.typeCodes)
  @JoinColumn({ name: 'grp_cd' })
  groupCode: GroupCode;

  @Column('varchar', { name: 'rmrk', length: 100 })
  remark: string;

  @Column('timestamp', { name: 'reg_dt' })
  regisDate: Date;

  @Column('timestamp', { name: 'upd_dt' })
  updateDate: Date;

  // Not Column, just relation
  @OneToMany(() => SignPolysemy, signPolysemy => signPolysemy.typeCode, { cascade: true })
  signPolysemies: SignPolysemy[];

  // Not Column, just relation
  @OneToMany(() => SignLanguageResource, signLanguageResource => signLanguageResource.typeCode, { cascade: true })
  signLanguageResources: SignLanguageResource[];
}
