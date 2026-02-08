# Supabase Setup Guide for HRMS Lite

## Step 1: Get Your Supabase Credentials

You already have:
- **Project URL**: `https://slqpepsomjelcjoemfck.supabase.co`
- **Publishable Key**: `sb_publishable_GP1gWDrbls_9LwccMHf71A_YQNtDECu`

## Step 2: Get Database Password

1. Go to https://app.supabase.com
2. Select your project (slqpepsomjelcjoemfck)
3. Go to **Project Settings** > **Database**
4. Copy your database password (or reset it if you don't have it)

## Step 3: Setup Database Schema

1. In Supabase Dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy the entire content of `database/schema.sql`
4. Paste and click **Run**
5. Verify tables are created in **Table Editor**

## Step 4: Add Sample Data (Optional)

1. In SQL Editor, create another new query
2. Copy the entire content of `database/sample_data.sql`
3. Paste and click **Run**
4. Check **Table Editor** to see the sample data

## Step 5: Configure Backend

1. In the `backend` folder, copy `.env.example` to `.env`:
   ```bash
   copy .env.example .env
   ```

2. Edit `.env` and update the DATABASE_URL with your password:
   ```
   DATABASE_URL=postgresql://postgres:YOUR_ACTUAL_PASSWORD@db.slqpepsomjelcjoemfck.supabase.co:5432/postgres
   ```
   Replace `YOUR_ACTUAL_PASSWORD` with your actual Supabase database password.

3. Save the file

## Step 6: Test Connection

1. Make sure you're in the backend directory:
   ```bash
   cd backend
   ```

2. Activate virtual environment:
   ```bash
   venv\Scripts\activate
   ```

3. Run the FastAPI server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```

4. Open http://localhost:8000/docs
5. Try the GET /api/employees endpoint - you should see sample data!

## Connection String Format

```
postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

For your project:
```
postgresql://postgres:[YOUR_PASSWORD]@db.slqpepsomjelcjoemfck.supabase.co:5432/postgres
```

## Troubleshooting

### Can't connect to database?
- Verify your password is correct
- Check if IP address is whitelisted in Supabase (Settings > Database > Connection Pooling)
- Make sure you're using the correct connection string format

### Tables not created?
- Run schema.sql again in SQL Editor
- Check for any error messages
- Verify you're in the correct project

### Connection pooling
For production, you might want to use Supabase's connection pooling:
```
postgresql://postgres:[PASSWORD]@db.slqpepsomjelcjoemfck.supabase.co:6543/postgres?pgbouncer=true
```
Note: Port 6543 instead of 5432

## Next Steps

1. ✅ Set up schema
2. ✅ Add sample data (optional)
3. ✅ Configure backend .env
4. ✅ Test the connection
5. 🚀 Start building!

## Security Notes

- Never commit your `.env` file to Git
- Keep your database password secure
- Use environment variables in production
- Consider using Supabase's Row Level Security (RLS) for production
