declare module "activity-tracking-sdk" {
  export interface ActivityLog {
    id: string;
    user_id: string;
    game_id: string;
    achievements: string[];
    levels_unlocked: string[];
    play_time: number;
    created_at: Date;
    extra_data: { [key: string]: string };
  }

  export interface ActivityLogRequest {
    user_id: string;
    game_id: string;
    achievements: string[];
    levels_unlocked: string[];
    play_time: number;
    created_at: Date;
    extra_data: { [key: string]: string };
  }

  export class ActivityTracker {
    constructor(apiUrl: string);
    log(logRequest: ActivityLogRequest): Promise<ActivityLog>;
    get(user?: string, game?: string): Promise<ActivityLog[]>;
  }
}
