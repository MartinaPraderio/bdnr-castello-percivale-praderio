import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Headers,
} from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ApiTags } from '@nestjs/swagger';
import { ActivityLogRequest } from './requets/activity-log-request.dto';
import { Activity } from 'src/models/activity.model';

@Controller('activity')
@ApiTags('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get('')
  async get(
    @Headers('x-api-key') apiKey: string,
    @Query('user') user?: string,
    @Query('game') game?: string,
  ): Promise<Activity[]> {
    return await this.activityService.get(apiKey, user, game);
  }

  @Post()
  async log(
    @Body() body: ActivityLogRequest,
    @Headers('x-api-key') apiKey: string,
  ): Promise<Activity> {
    return await this.activityService.log(apiKey, body);
  }
}
