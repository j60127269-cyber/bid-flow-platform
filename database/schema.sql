-- Enable necessary extensions, yes
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table (extends Supabase auth.users)
CREATE TABLE public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    company_name TEXT,
    phone TEXT,
    user_type TEXT CHECK (user_type IN ('individual', 'business')) DEFAULT 'individual',
    subscription_status TEXT CHECK (subscription_status IN ('active', 'inactive', 'cancelled')) DEFAULT 'inactive',
    subscription_end_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contracts table
CREATE TABLE public.contracts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    subcategory TEXT NOT NULL,
    location TEXT NOT NULL,
    estimated_value DECIMAL(15,2) NOT NULL,
    currency TEXT DEFAULT 'UGX',
    deadline TIMESTAMP WITH TIME ZONE NOT NULL,
    submission_deadline TIMESTAMP WITH TIME ZONE NOT NULL,
    contract_type TEXT CHECK (contract_type IN ('tender', 'rfp', 'rfq', 'auction')) NOT NULL,
    status TEXT CHECK (status IN ('open', 'closed', 'awarded', 'cancelled')) DEFAULT 'open',
    client_name TEXT NOT NULL,
    client_type TEXT CHECK (client_type IN ('government', 'private', 'ngo')) NOT NULL,
    requirements TEXT[] DEFAULT '{}',
    documents_url TEXT,
    contact_email TEXT,
    contact_phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bid_analytics table
CREATE TABLE public.bid_analytics (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    contract_id UUID REFERENCES public.contracts(id) ON DELETE CASCADE,
    total_bids INTEGER DEFAULT 0,
    average_bid DECIMAL(15,2),
    highest_bid DECIMAL(15,2),
    lowest_bid DECIMAL(15,2),
    winning_bid DECIMAL(15,2),
    winning_company TEXT,
    competition_level TEXT CHECK (competition_level IN ('low', 'medium', 'high')),
    win_probability_score DECIMAL(3,2) CHECK (win_probability_score >= 0 AND win_probability_score <= 1),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_tracking table
CREATE TABLE public.user_tracking (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    contract_id UUID REFERENCES public.contracts(id) ON DELETE CASCADE,
    status TEXT CHECK (status IN ('tracking', 'bidding', 'won', 'lost')) DEFAULT 'tracking',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, contract_id)
);

-- Create notifications table
CREATE TABLE public.notifications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT CHECK (type IN ('contract', 'deadline', 'payment', 'system')) NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create subscriptions table for payment tracking
CREATE TABLE public.subscriptions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    flutterwave_reference TEXT UNIQUE,
    amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'UGX',
    status TEXT CHECK (status IN ('pending', 'successful', 'failed', 'cancelled')) DEFAULT 'pending',
    payment_method TEXT CHECK (payment_method IN ('mobile_money', 'card')) NOT NULL,
    subscription_period_months INTEGER DEFAULT 1,
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_contracts_category ON public.contracts(category);
CREATE INDEX idx_contracts_location ON public.contracts(location);
CREATE INDEX idx_contracts_status ON public.contracts(status);
CREATE INDEX idx_contracts_deadline ON public.contracts(deadline);
CREATE INDEX idx_user_tracking_user_id ON public.user_tracking(user_id);
CREATE INDEX idx_user_tracking_contract_id ON public.user_tracking(contract_id);
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_read ON public.notifications(read);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contracts_updated_at BEFORE UPDATE ON public.contracts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bid_analytics_updated_at BEFORE UPDATE ON public.bid_analytics FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_tracking_updated_at BEFORE UPDATE ON public.user_tracking FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON public.subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bid_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can only see their own data
CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

-- Contracts are public (all authenticated users can view)
CREATE POLICY "Authenticated users can view contracts" ON public.contracts FOR SELECT USING (auth.role() = 'authenticated');

-- Bid analytics are public
CREATE POLICY "Authenticated users can view bid analytics" ON public.bid_analytics FOR SELECT USING (auth.role() = 'authenticated');

-- User tracking - users can only see their own tracking
CREATE POLICY "Users can view own tracking" ON public.user_tracking FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own tracking" ON public.user_tracking FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own tracking" ON public.user_tracking FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own tracking" ON public.user_tracking FOR DELETE USING (auth.uid() = user_id);

-- Notifications - users can only see their own notifications
CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

-- Subscriptions - users can only see their own subscriptions
CREATE POLICY "Users can view own subscriptions" ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own subscriptions" ON public.subscriptions FOR INSERT WITH CHECK (auth.uid() = user_id); 