# Supabase Setup for Dynamic Points Table

To enable the Dynamic Points Table & Live Scores, run the following SQL commands in your Supabase SQL Editor.

## 1. Create Tables & Views

```sql
-- 1. Create Teams Table
CREATE TABLE teams (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    short_name TEXT,
    logo TEXT, -- URL to image
    age_group TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create Matches Table
CREATE TABLE matches (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    home_team_id UUID REFERENCES teams(id) NOT NULL,
    away_team_id UUID REFERENCES teams(id) NOT NULL,
    home_score INTEGER,
    away_score INTEGER,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    status TEXT CHECK (status IN ('scheduled', 'live', 'completed')) DEFAULT 'scheduled',
    age_group TEXT NOT NULL,
    venue TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create Standings View (Auto-calculates table)
CREATE OR REPLACE VIEW standings_view AS
WITH team_stats AS (
    -- Calculate stats for Home Games
    SELECT 
        home_team_id as team_id,
        age_group,
        COUNT(*) as played,
        COUNT(CASE WHEN home_score > away_score THEN 1 END) as won,
        COUNT(CASE WHEN home_score = away_score THEN 1 END) as drawn,
        COUNT(CASE WHEN home_score < away_score THEN 1 END) as lost,
        COALESCE(SUM(home_score), 0) as goals_for,
        COALESCE(SUM(away_score), 0) as goals_against
    FROM matches
    WHERE status = 'completed'
    GROUP BY home_team_id, age_group

    UNION ALL

    -- Calculate stats for Away Games
    SELECT 
        away_team_id as team_id,
        age_group,
        COUNT(*) as played,
        COUNT(CASE WHEN away_score > home_score THEN 1 END) as won,
        COUNT(CASE WHEN away_score = home_score THEN 1 END) as drawn,
        COUNT(CASE WHEN away_score < home_score THEN 1 END) as lost,
        COALESCE(SUM(away_score), 0) as goals_for,
        COALESCE(SUM(home_score), 0) as goals_against
    FROM matches
    WHERE status = 'completed'
    GROUP BY away_team_id, age_group
),
aggregated_stats AS (
    SELECT 
        team_id,
        age_group,
        SUM(played) as played,
        SUM(won) as won,
        SUM(drawn) as drawn,
        SUM(lost) as lost,
        SUM(goals_for) as goals_for,
        SUM(goals_against) as goals_against,
        (SUM(goals_for) - SUM(goals_against)) as goal_difference,
        (SUM(won) * 3 + SUM(drawn)) as points
    FROM team_stats
    GROUP BY team_id, age_group
)
SELECT 
    t.name as team_name,
    t.logo as team_logo,
    s.*,
    -- Simple form array literal for now, complex logic omitted for brevity
    ARRAY[]::text[] as form
FROM aggregated_stats s
JOIN teams t ON s.team_id = t.id;
```

## 2. Seed Sample Data (U-7 Group)

```sql
-- Insert Teams
INSERT INTO teams (name, short_name, age_group, logo) VALUES 
('CP Sports', 'CPS', 'U-7', '/logos/cps.png'),
('Blue Panthers', 'BLU', 'U-7', '/logos/panthers.png'),
('Tron Sports Academy', 'TRN', 'U-7', '/logos/tron.png'),
('Shadows FC', 'SHD', 'U-7', '/logos/shadows.png');

-- Insert Matches (You'll need actual UUIDs from above, but for copy-paste we use subqueries)
INSERT INTO matches (home_team_id, away_team_id, home_score, away_score, start_time, status, age_group) 
VALUES 
(
    (SELECT id FROM teams WHERE name = 'CP Sports' LIMIT 1),
    (SELECT id FROM teams WHERE name = 'Blue Panthers' LIMIT 1),
    2, 1, NOW() - INTERVAL '1 day', 'completed', 'U-7'
),
(
    (SELECT id FROM teams WHERE name = 'Tron Sports Academy' LIMIT 1),
    (SELECT id FROM teams WHERE name = 'Shadows FC' LIMIT 1),
    1, 1, NOW() - INTERVAL '1 day', 'completed', 'U-7'
),
(
    (SELECT id FROM teams WHERE name = 'CP Sports' LIMIT 1),
    (SELECT id FROM teams WHERE name = 'Tron Sports Academy' LIMIT 1),
    NULL, NULL, NOW() + INTERVAL '2 hours', 'scheduled', 'U-7'
);
```
