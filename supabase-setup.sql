-- Create subscribers table for Liquidfy waitlist
CREATE TABLE IF NOT EXISTS subscribers (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address VARCHAR(45),
  user_agent TEXT
);

-- Enable Row Level Security (RLS)
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Create policy to allow API access (service role)
CREATE POLICY "API can manage subscribers" ON subscribers
  FOR ALL USING (true);

-- Create index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscribers_created_at ON subscribers(created_at);

-- Insert some test data (optional)
-- INSERT INTO subscribers (email, ip_address, user_agent) 
-- VALUES ('test@example.com', '127.0.0.1', 'Test User Agent')
-- ON CONFLICT (email) DO NOTHING; 