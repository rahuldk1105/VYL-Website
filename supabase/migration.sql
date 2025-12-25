-- Create the events table
CREATE TABLE IF NOT EXISTS events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    sport TEXT DEFAULT 'Football',
    start_date DATE,
    end_date DATE,
    location TEXT,
    max_teams INTEGER,
    registration_deadline DATE,
    image TEXT,
    slug TEXT UNIQUE NOT NULL,
    features JSONB,
    match_formats JSONB,
    price INTEGER,
    currency TEXT DEFAULT 'INR',
    registration_url TEXT,
    organizer TEXT,
    tagline TEXT,
    age_groups JSONB,
    match_rules JSONB,
    match_specifications JSONB,
    merchandise JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON events
    FOR SELECT USING (true);

-- Insert Mock Data
INSERT INTO events (
    title, description, sport, start_date, end_date, location, max_teams, 
    registration_deadline, image, slug, features, match_formats, price, 
    currency, registration_url, organizer, tagline, age_groups, match_rules, 
    match_specifications, merchandise
) VALUES 
(
    'VYL Season 1',
    'The inaugural season of the Veeran Youth League, setting the standard for youth football in Tamil Nadu. A resounding success with top teams competing for the first-ever VYL trophy.',
    'Football',
    '2023-08-10',
    '2023-08-12',
    'Chennai, Tamil Nadu',
    16,
    '2023-07-25',
    '/images/tournaments/vyl-season-1.png',
    'vyl-season-1',
    '["Professional referees", "Live streaming", "Trophy ceremony", "Player awards", "Medical support"]',
    '[{"name": "Group Stage", "description": "Round-robin format"}, {"name": "Knockout Stage", "description": "Semi-finals and Final"}]',
    1500,
    'INR',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
),
(
    'VYL Season 2',
    'Building on the success of Season 1, VYL Season 2 brought even more intensity and skill. An unforgettable tournament that showcased the rising stars of football.',
    'Football',
    '2024-01-20',
    '2024-01-22',
    'Chennai, Tamil Nadu',
    20,
    '2024-01-05',
    '/images/tournaments/vyl-season-2.jpg',
    'vyl-season-2',
    '["Expanded bracket", "Scouting opportunities", "Enhanced media coverage", "Skill challenges", "Gala awards night"]',
    '[{"name": "League Phase", "description": "Groups of 4 teams"}, {"name": "Championship Bracket", "description": "Top 2 from each group advance"}]',
    1500,
    'INR',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
),
(
    'Veeran Juniors League',
    'A dedicated league for our younger talents to shine. The Veeran Juniors League focused on grassroots development and the pure joy of the game.',
    'Football',
    '2024-05-15',
    '2024-05-17',
    'Chennai, Tamil Nadu',
    12,
    '2024-05-01',
    '/images/tournaments/juniors-league.jpg',
    'veeran-juniors-league',
    '["Age-appropriate coaching", "Focus on fundamentals", "Participation medals", "Family fun zone", "Development workshops"]',
    '[{"name": "Friendlies", "description": "Emphasis on playing time"}, {"name": "Mini-Tournament", "description": "Short format matches"}]',
    1000,
    'INR',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
),
(
    'Veeran Winter Cup',
    'The upcoming prestigious winter tournament. Join us for the Veeran Winter Cup and compete against the best. Registrations are now OPEN!',
    'Football',
    '2025-12-27',
    '2025-12-28',
    'HAL Stadium, Bangalore',
    54,
    '2025-12-25',
    '/images/tournaments/winter-cup-2025.jpg',
    'veeran-winter-cup',
    '["Championship Trophy", "Professional Scouts", "Live Streaming on YouTube", "Winter Festival Atmosphere"]',
    '[{"name": "League-cum-Knockout", "description": "Minimum 5 matches per team guaranteed"}]',
    2000,
    'INR',
    '/register/team',
    'Veeran Football League',
    'Two days. Endless energy. Pure football.',
    '{
      "boys": [
        { "category": "U-7", "bornOnOrAfter": "2018-01-01" },
        { "category": "U-9", "bornOnOrAfter": "2016-01-01" },
        { "category": "U-11", "bornOnOrAfter": "2014-01-01" },
        { "category": "U-13", "bornOnOrAfter": "2012-01-01" },
        { "category": "U-15", "bornOnOrAfter": "2010-01-01" },
        { "category": "U-17", "bornOnOrAfter": "2008-01-01" }
      ],
      "girls": [
        { "category": "U-15 Girls", "bornOnOrAfter": "2010-01-01" },
        { "category": "U-17 Girls", "bornOnOrAfter": "2008-01-01" },
        { "category": "Senior Girls", "bornOnOrAfter": "Open" }
      ]
    }',
    '{
      "general": [
        "Player ID verification (Aadhaar or valid ID) is mandatory",
        "Verification marking must be worn throughout the tournament",
        "Organizer reserves the right to amend rules if required"
      ],
      "standbyTime": 30
    }',
    '[
      { "category": "U-7", "ballSize": 3, "time": "10-2-10", "subs": "Rolling", "players": "5+3" },
      { "category": "U-9", "ballSize": 4, "time": "10-2-10", "subs": "Rolling", "players": "5+3" },
      { "category": "U-11", "ballSize": 4, "time": "10-2-10", "subs": "Rolling", "players": "7+5" },
      { "category": "U-13", "ballSize": 5, "time": "10-2-10", "subs": "Rolling", "players": "7+5" },
      { "category": "U-15", "ballSize": 5, "time": "10-2-10", "subs": "Rolling", "players": "7+5" },
      { "category": "U-17", "ballSize": 5, "time": "10-2-10", "subs": "Rolling", "players": "7+5" },
      { "category": "Senior Girls", "ballSize": 5, "time": "10-2-10", "subs": "Rolling", "players": "7+5" }
    ]',
    '{
      "players": [
        "Official participation medal",
        "Team jersey",
        "Premium kit bag",
        "Professional team photoshoot"
      ],
      "champions": [
        "Championship trophy awarded on final celebration day"
      ]
    }'
),
(
    'Veeran Development League',
    'Join the Veeran Development League for a comprehensive youth football experience. Featuring a double league format with a minimum of 10 matches per team, live streaming, and awards for every game!',
    'Football',
    '2026-02-01',
    '2026-02-22',
    'CP Sports Academy @ Vels, Old Pallavaram, Chennai-600117',
    24,
    '2026-01-20',
    '/images/development-league-flyer.png',
    'veeran-development-league',
    '["Minimum 10 matches guaranteed", "Double League Format", "Live streaming", "Weekend-only matches", "Player of the Match award in every game"]',
    '[{"name": "Double League", "description": "Minimum 10 matches per team"}]',
    8000,
    'INR',
    '/register/development-league',
    'Veeran Football Academy',
    'Double League | Minimum 10 Matches | Live Streaming',
    '{
      "boys": [
        { "category": "U-7", "bornOnOrAfter": "2019-01-01" },
        { "category": "U-9", "bornOnOrAfter": "2017-01-01" },
        { "category": "U-10", "bornOnOrAfter": "2016-01-01" },
        { "category": "U-12", "bornOnOrAfter": "2014-01-01" }
      ]
    }',
    NULL,
    '[
      { "category": "U-7", "ballSize": 3, "time": "4 x 5 mins", "subs": "Rolling (3+3 player squad)", "players": "3-a-side" },
      { "category": "U-9", "ballSize": 4, "time": "15 mins each half", "subs": "Rolling (5+3 player squad)", "players": "5-a-side" },
      { "category": "U-10", "ballSize": 4, "time": "15 mins each half", "subs": "Rolling (5+3 player squad)", "players": "5-a-side" },
      { "category": "U-12", "ballSize": 5, "time": "15 mins each half", "subs": "Rolling (7+5 player squad)", "players": "7-a-side" }
    ]',
    NULL
);
