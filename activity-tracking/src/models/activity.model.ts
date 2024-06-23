export class Activity {
  id: string;
  user_id: string;
  game_id: string;
  achievements: string[];
  levels_unlocked: string[];
  play_time: number;
  created_at: Date;
  extra_data: { [key: string]: string };
}
