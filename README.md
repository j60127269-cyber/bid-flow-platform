# BidFlow - Contract Management Platform

BidFlow is a comprehensive contract management platform that helps businesses and individuals discover, track, and win contracts through intelligent analytics and smart notifications.

## Features

### Core Features
- **Smart Contract Discovery**: Advanced search with filters for category, location, value range, and deadline
- **Bid Analytics**: Historical bid data, competition analysis, and win probability scoring
- **Contract Tracking**: Personal dashboard to track contracts you're interested in
- **Smart Notifications**: Real-time alerts for new contracts, deadlines, and important updates
- **Subscription Management**: Integrated payment system with Flutterwave (mobile money and cards)

### User Management
- Individual and business account types
- Secure authentication with Supabase
- Profile management and preferences
- Team collaboration features

### Analytics & Insights
- Historical bid data analysis
- Competition level indicators
- Win probability scoring
- ROI tracking and performance metrics
- Market trends and insights

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Real-time)
- **Payments**: Flutterwave integration
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- Flutterwave account (for payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bidflow-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

   # Flutterwave Configuration
   NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY=your_flutterwave_public_key
   FLUTTERWAVE_SECRET_KEY=your_flutterwave_secret_key
   FLUTTERWAVE_ENCRYPTION_KEY=your_flutterwave_encryption_key

   # Application Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NEXT_PUBLIC_SUBSCRIPTION_AMOUNT=30000
   NEXT_PUBLIC_SUBSCRIPTION_CURRENCY=UGX
   ```

4. **Set up Supabase Database**
   - Create a new Supabase project
   - Run the SQL schema from `database/schema.sql` in your Supabase SQL editor
   - Configure authentication settings in Supabase dashboard

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Database Schema

The application uses the following main tables:

- **users**: Extended user profiles with subscription status
- **contracts**: Contract/bid information and details
- **bid_analytics**: Historical bid data and competition analysis
- **user_tracking**: User's tracked contracts and status
- **notifications**: User notifications and alerts
- **subscriptions**: Payment and subscription tracking

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # Reusable components
│   ├── auth/             # Authentication components
│   └── dashboard/        # Dashboard components
├── lib/                  # Utility libraries
│   └── supabase.ts       # Supabase client and types
├── database/             # Database schema
│   └── schema.sql        # SQL schema file
├── public/               # Static assets
└── package.json          # Dependencies and scripts
```

## Subscription Model

- **Single Tier**: 30,000 UGX per month
- **Payment Methods**: Mobile money (default) and cards via Flutterwave
- **No Free Trial**: Premium-only model
- **Features**: All platform features included

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@bidflow.com or create an issue in the repository.

## Roadmap

- [ ] Mobile app development
- [ ] Advanced AI recommendations
- [ ] API for third-party integrations
- [ ] White-label solutions
- [ ] International expansion
- [ ] Advanced reporting and analytics
- [ ] Team collaboration features
- [ ] Document management system 