# R2 Directory Setup Guide

This project is configured to display photos from **Cloudflare R2** directories for each tournament/event.

## How It Works

1. You manually upload photos to R2 in organized directories (one directory per event)
2. You configure the R2 directory path for each event in the Supabase database
3. The gallery automatically displays all photos from that directory

## Database Setup

Add an `r2_directory` column to your `events` table in Supabase:

```sql
ALTER TABLE events
ADD COLUMN r2_directory TEXT;
```

## Directory Structure in R2

Organize your photos in R2 like this:

```
your-r2-bucket/
├── tournaments/
│   ├── summer-league-2024/
│   │   ├── photo1.jpg
│   │   ├── photo2.jpg
│   │   └── photo3.jpg
│   ├── winter-championship-2024/
│   │   ├── IMG001.jpg
│   │   ├── IMG002.jpg
│   │   └── IMG003.jpg
│   └── spring-tournament-2024/
│       ├── photo001.jpg
│       └── photo002.jpg
```

## Configuring Events

For each event in your Supabase `events` table, set the `r2_directory` field to the directory path:

### Example:

**Event:** Summer League 2024
**Slug:** `summer-league-2024`
**R2 Directory:** `tournaments/summer-league-2024`

**Event:** Winter Championship 2024
**Slug:** `winter-championship-2024`
**R2 Directory:** `tournaments/winter-championship-2024`

## SQL Example

```sql
UPDATE events
SET r2_directory = 'tournaments/summer-league-2024'
WHERE slug = 'summer-league-2024';

UPDATE events
SET r2_directory = 'tournaments/winter-championship-2024'
WHERE slug = 'winter-championship-2024';
```

## Uploading Photos to R2

You can upload photos to R2 using:

1. **Cloudflare Dashboard** - Web interface
2. **Wrangler CLI** - Command line tool
3. **rclone** - Powerful sync tool
4. **AWS CLI** - With S3-compatible endpoint

### Using Wrangler CLI:

```bash
# Upload a single file
wrangler r2 object put your-bucket/tournaments/summer-league-2024/photo1.jpg --file=./photo1.jpg

# Upload multiple files
for file in ./photos/*.jpg; do
  wrangler r2 object put "your-bucket/tournaments/summer-league-2024/$(basename $file)" --file="$file"
done
```

### Using rclone:

```bash
# Configure rclone with R2
rclone config

# Sync a local directory to R2
rclone sync ./local-photos/ r2:your-bucket/tournaments/summer-league-2024/
```

## Supported Image Formats

- JPEG (.jpg, .jpeg)
- PNG (.png)
- WebP (.webp)
- GIF (.gif)

## Important Notes

- Photos must be in the exact directory path specified in the database
- Directory paths should NOT start with a slash
- Directory paths should NOT end with a slash (the code handles this)
- All photos in the directory will be displayed in the gallery
- Maximum 1000 photos per directory (configurable in `/api/r2/list-directory/route.ts`)

## No Admin Panel Needed!

This setup eliminates the need for an admin panel. Just:
1. Upload photos to R2 manually
2. Update the database with the directory path
3. Photos appear in the gallery automatically
