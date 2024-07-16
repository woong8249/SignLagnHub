// entity/definition
import {
  Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';

import { GroupCode } from './groupCode';
import { Sign } from './sign';
import { User } from './user';

@Entity('tn_def')
export class Definition {
    @ManyToOne(() => GroupCode, group => group.signDefinitions)
    @JoinColumn({ name: 'grp_cd', referencedColumnName: 'code' })
    groupCode: GroupCode;

    @ManyToOne(() => Sign, sign => sign.definitions)
    @JoinColumn({ name: 'sign_id', referencedColumnName: 'id' })
    signId: Sign;

    @PrimaryGeneratedColumn({ name: 'def_id' })
    id: number;

    @Column({ name: 'def', type: 'varchar', length: 255 })
    definition: string;

    @Column({ name: 'ref_word', type: 'varchar', length: 50 })
    referenceWord: string;

    @ManyToOne(() => User, user => user.signDefinitions)
    @JoinColumn({ name: 'reg_by', referencedColumnName: 'id' })
    register: string;

    @Column({ name: 'reg_dt', type: 'timestamp' })
    regisDate: Date;

    @Column({ name: 'upd_dt', type: 'timestamp' })
    updateDate: Date;
}
