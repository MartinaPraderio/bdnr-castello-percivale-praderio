import "dotenv/config";
import {
  ActivityTracker,
  ActivityLog,
  ActivityLogRequest,
} from "activity-tracking-sdk";

const apiUrl = process.env.API_URL;
const apiKey = process.env.API_KEY;

if (!apiUrl || !apiKey) {
  console.error("API_URL and API_KEY must be configured in the .env file.");
  process.exit(1);
}

console.log(apiUrl);

console.log(apiKey);

const tracker = new ActivityTracker(apiUrl);

async function loadActivities() {
  const batchSize = 100; // Tamaño del lote
  const totalActivities = 10000;
  const activities: ActivityLogRequest[] = [];

  for (let i = 0; i < totalActivities; i++) {
    const isMultiplayer = Math.random() < 0.3;
    const isPc = Math.random() < 0.5;
    activities.push({
      user_id: `user${i}`,
      game_id: `game${Math.floor(i / 10)}`,
      achievements: [`achievement${i % 5}`],
      levels_unlocked: [`level${i % 3}`],
      play_time: Math.floor(Math.random() * 1000),
      created_at: new Date(),
      extra_data: {
        mode: isMultiplayer ? "multiplayer" : "single-player",
        console: isPc ? "pc" : "console",
      },
    });

    // Insertar lotes de actividades
    if (activities.length === batchSize || i === totalActivities - 1) {
      try {
        const results = await Promise.all(
          activities.map((activity) => tracker.log(activity))
        );
        console.log(
          `Batch of ${activities.length} activities logged. Results:`,
          results
        );
        activities.length = 0; // Limpiar el arreglo para el próximo lote
      } catch (error) {
        console.error("Error logging batch of activities:", error);
        // Manejar el error apropiadamente (reintentar, registrar, etc.)
      }
    }
  }
}

loadActivities();
