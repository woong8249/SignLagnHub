// entity/definition
import {
  Column, Entity, JoinColumn, ManyToOne, PrimaryColumn,
  // PrimaryGeneratedColumn,
} from 'typeorm';

import { GroupCode } from './groupCode';
import { Sign } from './sign';
import { User } from './user';

@Entity('tn_def')
export class Definition {
    @PrimaryColumn({ name: 'grp_cd', type: 'varchar' })
    @JoinColumn({ name: 'grp_cd', referencedColumnName: 'code' })
    @ManyToOne(() => GroupCode, group => group.signs)
    groupCode: GroupCode;

    @PrimaryColumn({ name: 'sign_id', type: 'int' })
    @JoinColumn([
      { name: 'grp_cd', referencedColumnName: 'groupCode' },
      { name: 'sign_id', referencedColumnName: 'id' },
    ])
    @ManyToOne(() => Sign, sign => sign.definitions)
    signId: number;

    @PrimaryColumn({ name: 'def_id', type: 'int' })
    id: number;

    @Column({ name: 'def', type: 'json' })
    definition: string;

    @Column({ name: 'ref_word', type: 'varchar', length: 50 })
    referenceWord: string;

    @ManyToOne(() => User, user => user.signDefinitions)
    @JoinColumn({ name: 'reg_by', referencedColumnName: 'id' })
    register: User;

    @Column({ name: 'reg_dt', type: 'timestamp' })
    regisDate: Date;

    @Column({ name: 'upd_dt', type: 'timestamp' })
    updateDate: Date;
}
