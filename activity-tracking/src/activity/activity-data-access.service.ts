import { Injectable } from '@nestjs/common';
import { CassandraService } from 'src/common_services/cassandra.service';
import { Activity } from 'src/models/activity.model';
import { v4 as uuidv4 } from 'uuid';
import { ActivityLogRequest } from './requets/activity-log-request.dto';

@Injectable()
export class ActivityDataAccess {
  constructor(private readonly cassandra: CassandraService) {}

  async log(activity: ActivityLogRequest): Promise<void> {
    const query = `
    INSERT INTO activity (id, user_id, game_id, play_time, achievements, levels_unlocked, created_at, extra_data)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      uuidv4(),
      activity.user_id,
      activity.game_id,
      activity.play_time,
      activity.achievements,
      activity.levels_unlocked,
      new Date(),
      activity.extra_data,
    ];
    await this.cassandra.execute(query, params);
  }

  async get(userId?: string, gameId?: string): Promise<Activity[]> {
    let query = 'SELECT * FROM activity';
    const params: any[] = [];

    if (userId || gameId) query += ' WHERE';

    if (userId) {
      query += ' user_id = ?';
      params.push(userId);
    }

    if (gameId) {
      if (params.length > 0) {
        query += ' AND';
      }
      query += ' game_id = ?';
      params.push(gameId);
    }

    if (userId || gameId) query += ' ALLOW FILTERING;';

    const result = await this.cassandra.execute(query, params);
    return result.rows;
  }
}
