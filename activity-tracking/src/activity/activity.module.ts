import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { CassandraService } from 'src/common_services/cassandra.service';
import { ActivityDataAccess } from './activity-data-access.service';

@Module({
  controllers: [ActivityController],
  providers: [ActivityService, CassandraService, ActivityDataAccess],
})
export class ActivityModule {}
