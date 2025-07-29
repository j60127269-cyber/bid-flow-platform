# BidFlow Setup Guide

## Step 1: Environment Variables Setup

Create a `.env.local` file in the root directory with the following content:

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

## Step 2: Set Up Supabase Database

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Open your project: `fiojgwgtrzjmfjkjueag`
3. Go to the SQL Editor
4. Copy and paste the entire content from `database/schema.sql`
5. Click "Run" to execute the schema

## Step 3: Configure Authentication

1. In your Supabase dashboard, go to Authentication > Settings
2. Configure your site URL: `http://localhost:3000`
3. Add redirect URLs:
   - `http://localhost:3000/auth/callback`
   - `http://localhost:3000/dashboard`
4. Save the settings

## Step 4: Run the Application

The development server should already be running. If not, run:

```bash
npm run dev
```

Then open: http://localhost:3000

## Step 5: Test the Application

1. **Landing Page**: Visit http://localhost:3000
2. **Registration**: Click "Get Started" and create an account
3. **Dashboard**: After registration, you'll be redirected to the dashboard
4. **Search Contracts**: Navigate to "Search Contracts" to test the search functionality
5. **Subscription**: Go to "Subscription" to test the payment flow

## Step 6: Add Sample Data (Optional)

To test with real data, you can add sample contracts to your database. Here's a sample SQL insert:

```sql
INSERT INTO contracts (
  title, 
  description, 
  category, 
  subcategory, 
  location, 
  estimated_value, 
  currency, 
  deadline, 
  submission_deadline, 
  contract_type, 
  status, 
  client_name, 
  client_type, 
  requirements
) VALUES 
(
  'Road Construction Project - Kampala',
  'Construction of 5km road network in Kampala city center including drainage systems and street lighting.',
  'Construction',
  'Road Construction',
  'Kampala',
  500000000,
  'UGX',
  '2024-12-31',
  '2024-11-30',
  'tender',
  'open',
  'Kampala Capital City Authority',
  'government',
  ARRAY['Valid construction license', '5 years experience', 'Financial capacity']
),
(
  'IT System Upgrade for Hospital',
  'Upgrade of hospital management system including hardware, software, and staff training.',
  'IT & Technology',
  'Software Development',
  'Entebbe',
  150000000,
  'UGX',
  '2024-10-15',
  '2024-09-15',
  'rfp',
  'open',
  'Entebbe Regional Hospital',
  'government',
  ARRAY['ISO 27001 certified', 'Healthcare experience', '24/7 support']
),
(
  'Agricultural Equipment Supply',
  'Supply of modern farming equipment including tractors, harvesters, and irrigation systems.',
  'Agriculture',
  'Equipment Supply',
  'Mbarara',
  300000000,
  'UGX',
  '2024-11-30',
  '2024-10-30',
  'tender',
  'open',
  'Mbarara Farmers Cooperative',
  'private',
  ARRAY['Equipment certification', 'Warranty coverage', 'Training services']
);
```

## Step 7: Flutterwave Integration (When Ready)

1. Sign up for a Flutterwave account
2. Get your API keys from the dashboard
3. Update the environment variables with your Flutterwave credentials
4. The payment integration is already set up in the subscription page

## Troubleshooting

### Common Issues:

1. **Authentication Errors**: Make sure your Supabase URL and key are correct
2. **Database Errors**: Ensure the schema has been executed successfully
3. **Build Errors**: Run `npm install` to ensure all dependencies are installed
4. **Port Issues**: If port 3000 is busy, the app will automatically use the next available port

### Getting Help:

- Check the browser console for any JavaScript errors
- Check the terminal for any build or runtime errors
- Verify your Supabase connection in the dashboard

## Next Steps

1. **Customize the Design**: Modify colors, fonts, and layout in `tailwind.config.js`
2. **Add More Features**: Implement analytics, notifications, and advanced search
3. **Deploy to Production**: Deploy to Vercel, Netlify, or your preferred platform
4. **Set Up Monitoring**: Add error tracking and analytics
5. **Marketing**: Create landing pages and marketing materials

Your BidFlow platform is now ready to use! 🚀 