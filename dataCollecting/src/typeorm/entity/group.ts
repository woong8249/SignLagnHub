// entity/groupCode.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Definition } from './definition';
import { Image } from './image';
import { Sign } from './sign';

@Entity({ name: 'tn_grp' })
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nm', type: 'varchar', length: 50 })
  name: string;

  @Column({ name: 'rmrk', type: 'varchar', length: 100 })
  remark: string;

  @CreateDateColumn({ name: 'reg_dt', type: 'timestamp' })
  regisDate: Date;

  @OneToMany(() => Sign, sign => sign.group, { cascade: true })
  signs: Sign[];

  @OneToMany(() => Definition, def => def.group, { cascade: true })
  signDefinitions: Definition[];

  @OneToMany(() => Image, image => image.group, { cascade: true })
  images: Image[];
}
