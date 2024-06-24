import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { ActivityController } from './activity/activity.controller';
import { ActivityService } from './activity/activity.service';
import { ActivityModule } from './activity/activity.module';
import { CassandraService } from './common_services/cassandra.service';
import { ActivityDataAccess } from './activity/activity-data-access.service';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [ActivityModule],
  controllers: [ActivityController],
  providers: [
    ActivityService,
    ActivityDataAccess,
    CassandraService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
