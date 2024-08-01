// entity/groupCode.ts
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { Definition } from '../definitions/definition.entity';
import { Sign } from '../signs/sign.entity';
import { Image } from 'src/images/image.entity';

@Entity({ name: 'tn_grp_cd' })
export class GroupCode {
  @PrimaryColumn({ name: 'grp_cd', type: 'varchar', length: 2 })
  code: string;

  @Column({ name: 'grp_nm', type: 'varchar', length: 50 })
  name: string;

  @Column({ name: 'rmrk', type: 'varchar', length: 100 })
  remark: string;

  @Column({ name: 'reg_dt', type: 'timestamp' })
  regisDate: Date;

  @OneToMany(() => Sign, (sign) => sign.groupCode, { cascade: true })
  signs: Sign[];

  @OneToMany(() => Definition, (def) => def.groupCode, { cascade: true })
  signDefinitions: Definition[];

  @OneToMany(() => Image, (def) => def.groupCode, { cascade: true })
  images: Image[];
}
