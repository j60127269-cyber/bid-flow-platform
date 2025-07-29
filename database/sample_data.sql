-- Sample Contracts Data
INSERT INTO public.contracts (
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
  requirements,
  contact_email,
  contact_phone
) VALUES 
(
  'Road Construction Project - Kampala City Center',
  'Construction of 5km road network in Kampala city center including drainage systems, street lighting, and pedestrian walkways. Project includes traffic management during construction.',
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
  ARRAY['Valid construction license', '5 years experience in road construction', 'Financial capacity of 200M UGX', 'ISO 9001 certification'],
  'procurement@kcca.go.ug',
  '+256-414-123456'
),
(
  'IT System Upgrade for Regional Hospital',
  'Complete upgrade of hospital management system including hardware procurement, software installation, staff training, and 24/7 support for 12 months.',
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
  ARRAY['ISO 27001 certified', 'Healthcare IT experience', '24/7 support capability', 'Staff training program'],
  'it@entebbehospital.go.ug',
  '+256-414-234567'
),
(
  'Agricultural Equipment Supply and Training',
  'Supply of modern farming equipment including tractors, harvesters, irrigation systems, and comprehensive training for local farmers.',
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
  ARRAY['Equipment certification', 'Warranty coverage', 'Training services', 'After-sales support'],
  'procurement@mbararafarmers.co.ug',
  '+256-414-345678'
),
(
  'Solar Power Installation for Schools',
  'Installation of solar power systems in 10 rural schools including panels, batteries, inverters, and maintenance training.',
  'Energy',
  'Renewable Energy',
  'Gulu',
  250000000,
  'UGX',
  '2024-09-30',
  '2024-08-30',
  'tender',
  'open',
  'Ministry of Education',
  'government',
  ARRAY['Solar installation license', '5 years experience', 'Training capability', 'Maintenance support'],
  'procurement@education.go.ug',
  '+256-414-456789'
),
(
  'Water Supply System Rehabilitation',
  'Rehabilitation of water supply system serving 50,000 people including pipe replacement, pump stations, and water quality monitoring.',
  'Construction',
  'Water Infrastructure',
  'Jinja',
  400000000,
  'UGX',
  '2024-12-15',
  '2024-11-15',
  'tender',
  'open',
  'National Water and Sewerage Corporation',
  'government',
  ARRAY['Water engineering license', '10 years experience', 'Quality certification', 'Environmental compliance'],
  'tenders@nwsc.co.ug',
  '+256-414-567890'
),
(
  'Digital Marketing Campaign for Tourism',
  'Comprehensive digital marketing campaign to promote Uganda tourism including social media, website development, and content creation.',
  'IT & Technology',
  'Digital Marketing',
  'Kampala',
  80000000,
  'UGX',
  '2024-08-31',
  '2024-07-31',
  'rfp',
  'open',
  'Uganda Tourism Board',
  'government',
  ARRAY['Digital marketing experience', 'Portfolio of tourism projects', 'Social media expertise', 'Content creation skills'],
  'marketing@utb.go.ug',
  '+256-414-678901'
),
(
  'Security System Installation for Bank',
  'Installation of comprehensive security system including CCTV cameras, access control, alarm systems, and monitoring center.',
  'IT & Technology',
  'Security Systems',
  'Kampala',
  120000000,
  'UGX',
  '2024-10-31',
  '2024-09-30',
  'tender',
  'open',
  'Stanbic Bank Uganda',
  'private',
  ARRAY['Security system certification', 'Banking sector experience', '24/7 monitoring capability', 'Compliance with regulations'],
  'procurement@stanbic.co.ug',
  '+256-414-789012'
),
(
  'Medical Equipment Supply for Clinics',
  'Supply of medical equipment for 5 rural clinics including diagnostic tools, patient monitoring systems, and staff training.',
  'Healthcare',
  'Medical Equipment',
  'Mbale',
  180000000,
  'UGX',
  '2024-11-15',
  '2024-10-15',
  'tender',
  'open',
  'Ministry of Health',
  'government',
  ARRAY['Medical equipment certification', 'Healthcare experience', 'Training capability', 'After-sales support'],
  'procurement@health.go.ug',
  '+256-414-890123'
);

-- Sample Bid Analytics Data
INSERT INTO public.bid_analytics (
  contract_id,
  total_bids,
  average_bid,
  highest_bid,
  lowest_bid,
  competition_level,
  win_probability_score
) VALUES 
(
  (SELECT id FROM public.contracts WHERE title = 'Road Construction Project - Kampala City Center'),
  8,
  480000000,
  520000000,
  450000000,
  'high',
  0.75
),
(
  (SELECT id FROM public.contracts WHERE title = 'IT System Upgrade for Regional Hospital'),
  5,
  145000000,
  160000000,
  130000000,
  'medium',
  0.65
),
(
  (SELECT id FROM public.contracts WHERE title = 'Agricultural Equipment Supply and Training'),
  12,
  290000000,
  320000000,
  270000000,
  'high',
  0.55
),
(
  (SELECT id FROM public.contracts WHERE title = 'Solar Power Installation for Schools'),
  6,
  245000000,
  260000000,
  230000000,
  'medium',
  0.70
),
(
  (SELECT id FROM public.contracts WHERE title = 'Water Supply System Rehabilitation'),
  10,
  390000000,
  420000000,
  370000000,
  'high',
  0.60
);

-- Sample Notifications
INSERT INTO public.notifications (
  user_id,
  title,
  message,
  type,
  read
) VALUES 
(
  (SELECT id FROM auth.users LIMIT 1),
  'New Contract Available',
  'A new road construction project in Kampala has been posted. Estimated value: 500M UGX',
  'contract',
  false
),
(
  (SELECT id FROM auth.users LIMIT 1),
  'Deadline Reminder',
  'Your tracked contract "IT System Upgrade" deadline is approaching in 5 days',
  'deadline',
  false
),
(
  (SELECT id FROM auth.users LIMIT 1),
  'Payment Successful',
  'Your subscription payment of 30,000 UGX has been processed successfully',
  'payment',
  true
); 