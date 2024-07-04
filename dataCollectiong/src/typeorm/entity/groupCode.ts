// entity/groupCode.ts
import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

import { SignLanguageResource } from './signLanguageResource';
import { SignPolysemy } from './signPolysemy';
import { SignTypeCode } from './signTypeCode';

@Entity({ name: 'tn_grp_cd' })
export class GroupCode {
  // PK
  @PrimaryColumn('varchar', { name: 'grp_cd', length: 2 })
  groupCode: string;

  @Column('varchar', { name: 'grp_nm', length: 50 })
  groupName: string;

  @Column('varchar', { name: 'rmrk', length: 100 })
  remark: string;

  @Column('timestamp', { name: 'reg_dt' })
  regisDate: Date;

  // Not Column, just relation
  @OneToMany(() => SignTypeCode, signTypeCode => signTypeCode.groupCode, { cascade: true })
  typeCodes: SignTypeCode[];

  // Not Column, just relation
  @OneToMany(() => SignPolysemy, signPolysemy => signPolysemy.id, { cascade: true })
  SignPolysemies: SignPolysemy[];

  // Not Column, just relation
  @OneToMany(() => SignLanguageResource, signLanguageResource => signLanguageResource.id, { cascade: true })
  SignLanguageResources: SignLanguageResource[];
}
