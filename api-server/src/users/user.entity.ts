// entity/user
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Definition } from '../definitions/definition.entity';
import { Sign } from '../signs/sign.entity';

@Entity({ name: 'tn_user' })
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number;

  @Column({ name: 'user_mail', type: 'varchar', length: 50 })
  email: string;

  @Column({ name: 'user_pwd', type: 'varchar', length: 255 })
  password: string;

  @Column({ name: 'user_role', type: 'enum', enum: ['user', 'admin'] })
  role: 'user' | 'admin';

  @Column({ name: 'user_nm', type: 'varchar', length: 50 })
  name: string;

  @Column({ name: 'user_loc', type: 'varchar', length: 50 })
  location: string;

  @Column({ name: 'reg_dt', type: 'timestamp' })
  regisDate: Date;

  @OneToMany(() => Sign, (sign) => sign.register, { cascade: true })
  signs: Sign[];

  @OneToMany(() => Definition, (sign) => sign.register, { cascade: true })
  signDefinitions: Definition[];
}
