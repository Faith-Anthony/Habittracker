# Database Monitoring Guide for HabitTracker

## How to Check Your Database

### 1. **View Auth Users**
- Go to: https://app.supabase.com/projects
- Select: `habittracker` project
- Left sidebar → **Authentication**
- See all users who signed up
- Shows: email, created date, last login, etc.

### 2. **View Habits Data**
- Left sidebar → **SQL Editor**
- Click **New Query**
- Run: `SELECT * FROM habits;`
- Or use the **Table Editor**:
  - Left sidebar → **Table Editor**
  - Click `habits` table
  - See all habits with: id, user_id, name, frequency, color, etc.

### 3. **View Completions Data**
- **Table Editor** → `completions` table
- See all habit completions
- Each row shows: habit_id, date, notes

### 4. **Check Specific User's Data**
```sql
-- Get a user's habits
SELECT h.* FROM habits h
WHERE h.user_id = 'USER_ID_HERE';

-- Get a user's completions
SELECT c.* FROM completions c
JOIN habits h ON c.habit_id = h.id
WHERE h.user_id = 'USER_ID_HERE'
ORDER BY c.date DESC;

-- Get completion stats
SELECT 
  h.name,
  COUNT(c.id) as total_completions,
  MAX(c.date) as last_completed
FROM habits h
LEFT JOIN completions c ON h.id = c.habit_id
GROUP BY h.id, h.name;
```

### 5. **Real-Time Monitoring**
- Go to **SQL Editor**
- Click **New Query**
- Check results after users signup/login/create habits
- Data updates instantly!

## Quick Testing Flow

1. Sign up at your Vercel app URL
2. Go to Supabase → **Authentication** → See your user
3. Create a habit in your app
4. Go to Supabase → **Table Editor** → `habits` → See it there!
5. Complete a habit in your app
6. Go to Supabase → **Table Editor** → `completions` → See the entry!

## Pro Monitoring Dashboard

Create a monitoring page in your app to see live data (coming next!)
