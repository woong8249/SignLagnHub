import {
  ConsoleLogger,
  Injectable,
  LoggerService,
  LogLevel,
  Scope,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable({ scope: Scope.TRANSIENT })
export class MyLogger extends ConsoleLogger implements LoggerService {
  constructor(private configService: ConfigService) {
    super();
    const level = this.configService.get<LogLevel>('node.logLevel');
    this.setLogLevels([level]);
  }
}
