// entity/user
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Definition } from './definition';
import { Sign } from './sign';

@Entity({ name: 'tn_user' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
      name: 'email', type: 'varchar', length: 50,
    })
    email: string;

    @Column({
      name: 'pwd', type: 'varchar', length: 255,
    })
    password: string;

    @Column({
      name: 'role', type: 'enum', enum: ['user', 'admin'],
    })
    role: 'user' | 'admin';

    @Column({
      name: 'nm', type: 'varchar', length: 50,
    })
    name: string;

    @Column({
      name: 'loc', type: 'varchar', length: 50, nullable: true,
    })
    location: string;

    @Column({ name: 'reg_dt', type: 'timestamp' })
    regisDate: Date;

    @OneToMany(() => Sign, sign => sign.register, { cascade: true })
    signs: Sign[];

    @OneToMany(() => Definition, sign => sign.register, { cascade: true })
    signDefinitions: Definition[];
}
