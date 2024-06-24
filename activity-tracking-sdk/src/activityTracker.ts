import axios from "axios";

export interface ActivityLogRequest {
  user_id: string;
  game_id: string;
  achievements: string[];
  levels_unlocked: string[];
  play_time: number;
  created_at: Date;
  extra_data: { [key: string]: string };
}

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

export class ActivityTracker {
  private apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async log(logRequest: ActivityLogRequest): Promise<ActivityLog> {
    try {
      const url = `${this.apiUrl}/activity`;
      const response = await axios.post(url, logRequest, {
        headers: {
          "x-api-key": process.env.API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error tracking activity:", error);
      throw error;
    }
  }

  async get(user?: string, game?: string): Promise<ActivityLog[]> {
    try {
      let url = `${this.apiUrl}/activity`;
      const params = [];
      if (user) params.push(`user=${encodeURIComponent(user)}`);
      if (game) params.push(`game=${encodeURIComponent(game)}`);
      if (params.length > 0) url += "?" + params.join("&");
      const response = await axios.get(url, {
        headers: {
          "x-api-key": process.env.API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error tracking activity:", error);
      throw error;
    }
  }
}
