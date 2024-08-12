// entity/definition
import {
  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Group } from './group';
import { Sign } from './sign';
import { User } from './user';

@Entity('tn_def')
export class Definition {
    @JoinColumn({ name: 'grp_cd', referencedColumnName: 'id' })
    @ManyToOne(() => Group, group => group.signs)
    group: Group;

    @JoinColumn([
      { name: 'sign_id', referencedColumnName: 'id' },
    ])
    @ManyToOne(() => Sign, sign => sign.definitions)
    sign: Sign;

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'def', type: 'json' })
    definition: string;

    @Column({ name: 'ref_word', type: 'varchar', length: 50 })
    referenceWord: string;

    @ManyToOne(() => User, user => user.signDefinitions)
    @JoinColumn({ name: 'reg_by', referencedColumnName: 'id' })
    register: User;

    @CreateDateColumn({ name: 'reg_dt', type: 'timestamp' })
    regisDate: Date;

    @UpdateDateColumn({ name: 'upd_dt', type: 'timestamp' })
    updateDate: Date;
}
