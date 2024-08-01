// entity/groupCode.ts
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Definition } from '../definitions/definition.entity';
import { Sign } from '../signs/sign.entity';
import { Image } from 'src/images/image.entity';

@Entity({ name: 'tn_grp' })
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nm', type: 'varchar', length: 50 })
  name: string;

  @Column({ name: 'rmrk', type: 'varchar', length: 100 })
  remark: string;

  @Column({ name: 'reg_dt', type: 'timestamp' })
  regisDate: Date;

  @OneToMany(() => Sign, (sign) => sign.group, { cascade: true })
  signs: Sign[];

  @OneToMany(() => Definition, (def) => def.group, { cascade: true })
  signDefinitions: Definition[];

  @OneToMany(() => Image, (image) => image.group, { cascade: true })
  images: Image[];
}
