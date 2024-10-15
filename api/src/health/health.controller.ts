import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    private http: HttpHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([async () => this.db.pingCheck('postgres')]);
  }

  @Get("ready")
  @HealthCheck()
  ready() {
    return this.health.check([
      async () => this.db.pingCheck('postgres'),
      async () =>
        this.http.pingCheck('another-api', 'http://localhost:4000/health'),
    ]);
  }
}
