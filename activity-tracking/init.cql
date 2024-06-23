CREATE KEYSPACE IF NOT EXISTS activity_tracking
WITH REPLICATION = {
  'class': 'SimpleStrategy',
  'replication_factor': 1
};

USE activity_tracking;

CREATE TABLE IF NOT EXISTS activity (
  id UUID PRIMARY KEY,
  user_id TEXT,
  game_id TEXT,
  play_time int,
  achievements set<text>,
  levels_unlocked set<text>,
  created_at timestamp,
  extra_data map<text, text>
);
