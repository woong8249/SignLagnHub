import { PickType } from '@nestjs/swagger';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';

export class LoginDTO extends PickType(CreateUserDTO, ['email', 'password']) {}
