// entity/user
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Definition } from '../definitions/definition.entity';
import { Sign } from '../signs/sign.entity';

@Entity({ name: 'tn_user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  email: string;

  @Column({
    name: 'pwd',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  password: string;

  @Column({
    name: 'role',
    type: 'enum',
    enum: ['user', 'admin'],
    nullable: true,
  })
  role: 'user' | 'admin';

  @Column({
    name: 'nm',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  name: string;

  @Column({ name: 'loc', type: 'varchar', length: 50 })
  location: string;

  @Column({ name: 'reg_dt', type: 'timestamp', nullable: true })
  regisDate: Date;

  @OneToMany(() => Sign, (sign) => sign.register, { cascade: true })
  signs: Sign[];

  @OneToMany(() => Definition, (sign) => sign.register, { cascade: true })
  signDefinitions: Definition[];
}
