import { User as UserEntity } from '../user.entity';

export interface IUser extends Omit<UserEntity, 'password'> {}
export interface IUserWithPass extends UserEntity {}
