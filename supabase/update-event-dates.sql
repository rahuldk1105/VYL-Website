-- SQL script to update event dates in Supabase database
-- Run this in your Supabase SQL Editor

-- Update VYL Season 1: Change from 2023 to 2024
UPDATE events
SET
  start_date = '2024-08-10'::date,
  end_date = '2024-08-12'::date,
  registration_deadline = '2024-07-25'::date
WHERE slug = 'vyl-season-1';

-- Update VYL Season 2: Change from 2024 to 2025
UPDATE events
SET
  start_date = '2025-01-20'::date,
  end_date = '2025-01-22'::date,
  registration_deadline = '2025-01-05'::date
WHERE slug = 'vyl-season-2';

-- Update Veeran Juniors League: Change from 2024 to 2025
UPDATE events
SET
  start_date = '2025-05-15'::date,
  end_date = '2025-05-17'::date,
  registration_deadline = '2025-05-01'::date
WHERE slug = 'veeran-juniors-league';

-- Verify the updates
SELECT
  id,
  title,
  start_date,
  end_date,
  registration_deadline,
  slug
FROM events
WHERE slug IN ('vyl-season-1', 'vyl-season-2', 'veeran-juniors-league')
ORDER BY start_date;
