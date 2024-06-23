import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Activity } from 'src/models/activity.model';
import { ActivityDataAccess } from './activity-data-access.service';
import { ActivityLogRequest } from './requets/activity-log-request.dto';

@Injectable()
export class ActivityService {
  constructor(private readonly dataAccess: ActivityDataAccess) {}

  async log(apiKey: string, activity: ActivityLogRequest): Promise<Activity> {
    if (apiKey != process.env.API_KEY)
      throw new ForbiddenException('missing_api_key');

    await this.dataAccess.log(activity);
    const result: Activity[] = await this.dataAccess.get(
      activity.user_id,
      activity.game_id,
    );
    return result[0];
  }

  async get(
    apiKey: string,
    userId?: string,
    gameId?: string,
  ): Promise<Activity[]> {
    if (apiKey != process.env.API_KEY)
      throw new ForbiddenException('missing_api_key');
    const result: Activity[] = await this.dataAccess.get(userId, gameId);
    return result;
  }
}
