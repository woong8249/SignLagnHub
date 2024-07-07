import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { GroupCode } from './groupCode';
import { SignTypeCode } from './signTypeCode';

@Entity({ name: 'tn_sign_lang_resr' })
export class SignLanguageResource {
    // PK
    @PrimaryGeneratedColumn({ name: 'object_id' })
    id: number;

    // FK
    @JoinColumn({ name: 'grp_cd' })
    @ManyToOne(() => GroupCode, group => group.signLanguageResources)
    groupCode: GroupCode;

    // FK
    @JoinColumn({ name: 'type_cd' })
    @ManyToOne(() => SignTypeCode, type => type.signLanguageResources)
    typeCode:SignTypeCode;

    @Column('varchar', { name: 'object_url', length: 300 })
    url: string;

    @Column('varchar', { name: 'remark', length: 100 })
    remark: string;

    @Column('timestamp', { name: 'reg_dt' })
    regisDate: Date;

    @Column('timestamp', { name: 'upd_dt' })
    updateDate: Date;
}
