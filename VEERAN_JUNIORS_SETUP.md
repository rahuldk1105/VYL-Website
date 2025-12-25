# SQL Queries for Veeran Juniors 2025 Setup

## 1. Check Current Event Data
First, let's see what data exists for Veeran Juniors:

```sql
SELECT id, title, slug, start_date, r2_directory
FROM events
WHERE title ILIKE '%veeran juniors%'
   OR slug ILIKE '%veeran-juniors%';
```

## 2. Update Event to Show 2025 and Link R2 Directory

Run this to ensure the event shows "2025" in the gallery and links to your R2 directory:

```sql
-- Update Veeran Juniors event with correct year and R2 directory
UPDATE events
SET
  title = 'Veeran Juniors 2025',
  slug = 'veeran-juniors-2025',
  start_date = '2025-01-01',  -- Adjust to actual start date
  r2_directory = 'veeran-gallery-photos/Veeran Juniors 2025'
WHERE title ILIKE '%veeran juniors%';
```

## 3. If Event Doesn't Exist, Create It

If the event doesn't exist yet, create it:

```sql
INSERT INTO events (
  title,
  slug,
  description,
  sport,
  start_date,
  end_date,
  location,
  max_teams,
  registration_deadline,
  image,
  r2_directory,
  price,
  currency
) VALUES (
  'Veeran Juniors 2025',
  'veeran-juniors-2025',
  'Veeran Juniors Tournament 2025',
  'Football',
  '2025-03-01',  -- Set actual start date
  '2025-03-03',  -- Set actual end date
  'Your Location',
  16,
  '2025-02-20',
  'https://images.unsplash.com/photo-1551958219-acbc608c6377',  -- Tournament image
  'veeran-gallery-photos/Veeran Juniors 2025',
  100,
  'USD'
);
```

## 4. Verify the Setup

Check that everything is configured correctly:

```sql
SELECT
  id,
  title,
  slug,
  start_date,
  r2_directory,
  EXTRACT(YEAR FROM start_date) as year_displayed
FROM events
WHERE slug = 'veeran-juniors-2025';
```

## 5. Test Gallery URL

After running these queries, the gallery should be accessible at:
- **Gallery List**: `https://yoursite.com/gallery`
- **Veeran Juniors 2025 Photos**: `https://yoursite.com/gallery/veeran-juniors-2025`

---

## Important Notes:

1. **Year Display**: The year shown on the gallery card comes from `start_date`
2. **Slug Must Match**: The `slug` in Supabase must match the URL path
3. **R2 Directory Path**: Must exactly match your R2 bucket structure: `veeran-gallery-photos/Veeran Juniors 2025`
4. **Photos**: All photos in that R2 directory will automatically appear in the gallery
