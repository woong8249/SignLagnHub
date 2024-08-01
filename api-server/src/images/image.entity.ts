import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { GroupCode } from '../group-codes/group-code.entity';

@Entity({ name: 'tn_img' })
export class Image {
  @PrimaryColumn({ name: 'grp_cd', type: 'varchar' })
  @JoinColumn({ name: 'grp_cd', referencedColumnName: 'code' })
  @ManyToOne(() => GroupCode, (group) => group.images)
  groupCode: GroupCode;

  @Column({ name: 'img_cd', type: 'varchar', length: 2 })
  imageCode: string;

  @Column({ name: 'end_point_url', type: 'varchar', length: 100 })
  endPointUrl: string;

  @Column({ name: 'port_num', type: 'varchar', length: 5 })
  portNumber: string;

  @Column({ name: 'bucket_nm', type: 'varchar', length: 50 })
  bucketName: string;

  @Column({ name: 'file_extension', type: 'varchar', length: 10 })
  fileExtension: string;

  @Column({ name: 'rmrk', type: 'varchar', length: 100 })
  remark: string;
}
