import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'tn_user' })
export class User {
    @PrimaryGeneratedColumn({ name: 'user_id' })
    id: number;

    @Column('varchar', { name: 'user_mail', length: 50 })
    email: string;

    @Column('varchar', { name: 'user_pwd', length: 200 })
    password: string;

    @Column('varchar', { name: 'user_nm', length: 50 })
    name: string;

    @Column('varchar', { name: 'user_loc', length: 50 })
    location: string;

    @Column('timestamp', { name: 'reg_dt' })
    regisDate: Date;
}
