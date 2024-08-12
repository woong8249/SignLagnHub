import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DataSource, Repository } from 'typeorm';
import { IUser, IUserWithPass } from './interfaces/user.interface';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}

  async findById(id: number): Promise<IUser | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<IUserWithPass | null> {
    return this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });
  }

  async createUser({
    email,
    password,
    name,
    location,
  }: CreateUserDTO): Promise<boolean> {
    return await this.dataSource.manager
      .transaction(async (transactionalEntityManager) => {
        const user = await this.findByEmail(email);
        if (user) throw new ConflictException('The email already exists.');
        const newUser = new User();
        newUser.email = email;
        newUser.password = bcrypt.hashSync(password, 10);
        newUser.name = name;
        newUser.location = location;
        newUser.role = 'user';
        await transactionalEntityManager.save(newUser);
      })
      .then(() => true);
  }
}
