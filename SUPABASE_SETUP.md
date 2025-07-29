# Supabase Setup Guide for BidFlow

## Step 1: Environment Configuration

Create a `.env.local` file in your project root with:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://fiojgwgtrzjmfjkjueag.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpb2pnd2d0cnpqbWZqa2p1ZWFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3ODczNDcsImV4cCI6MjA2OTM2MzM0N30.K89sLfiosRuVVGXcT_jQ7acp9ZEROAZLCQMUB0SH7Wg

# Flutterwave Configuration (Add your Flutterwave credentials when ready)
NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY=your_flutterwave_public_key
FLUTTERWAVE_SECRET_KEY=your_flutterwave_secret_key
FLUTTERWAVE_ENCRYPTION_KEY=your_flutterwave_encryption_key

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUBSCRIPTION_AMOUNT=30000
NEXT_PUBLIC_SUBSCRIPTION_CURRENCY=UGX
```

## Step 2: Database Schema Setup

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard
2. **Open your project**: `fiojgwgtrzjmfjkjueag`
3. **Go to SQL Editor**
4. **Copy and paste the entire content** from `database/schema.sql`
5. **Click "Run"** to execute the schema

## Step 3: Add Sample Data

1. **In the same SQL Editor**
2. **Copy and paste the content** from `database/sample_data.sql`
3. **Click "Run"** to add sample contracts and data

## Step 4: Configure Authentication

1. **In Supabase Dashboard**, go to **Authentication > Settings**
2. **Configure Site URL**: `http://localhost:3000`
3. **Add Redirect URLs**:
   - `http://localhost:3000/auth/callback`
   - `http://localhost:3000/dashboard`
4. **Save settings**

## Step 5: Test Your Application

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Open your browser**: http://localhost:3000

3. **Test the features**:
   - ✅ Landing page
   - ✅ User registration
   - ✅ User login
   - ✅ Dashboard
   - ✅ Contract search
   - ✅ Subscription page

## Step 6: Sample Data Included

Your database will now have:

### Contracts (8 sample contracts):
- Road Construction Project - Kampala (500M UGX)
- IT System Upgrade for Hospital (150M UGX)
- Agricultural Equipment Supply (300M UGX)
- Solar Power Installation (250M UGX)
- Water Supply System (400M UGX)
- Digital Marketing Campaign (80M UGX)
- Security System Installation (120M UGX)
- Medical Equipment Supply (180M UGX)

### Bid Analytics:
- Competition levels and win probability scores
- Historical bid data for each contract

### Categories Available:
- Construction
- IT & Technology
- Agriculture
- Energy
- Healthcare

## Step 7: Test User Flow

1. **Register a new account**
2. **Login to the dashboard**
3. **Search for contracts** using filters
4. **Track contracts** you're interested in
5. **View subscription options**

## Troubleshooting

### Common Issues:

1. **Authentication Errors**:
   - Check your Supabase URL and key
   - Verify redirect URLs in Supabase settings

2. **Database Errors**:
   - Ensure schema has been executed
   - Check table permissions in Supabase

3. **Build Errors**:
   - Run `npm install` to ensure dependencies
   - Check for TypeScript errors

### Getting Help:

- Check browser console for JavaScript errors
- Check terminal for build/runtime errors
- Verify Supabase connection in dashboard

## Next Steps

1. **Test all features** thoroughly
2. **Add more sample data** if needed
3. **Set up Flutterwave payments**
4. **Deploy to production**
5. **Configure monitoring and analytics**

Your BidFlow platform is now fully connected to Supabase and ready for testing! 🚀 