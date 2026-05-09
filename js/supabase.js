/* ============================================================
   SUPABASE CONFIGURATION
   ------------------------------------------------------------
   Ganti YOUR_SUPABASE_URL dan YOUR_SUPABASE_ANON_KEY
   dengan nilai dari Project Settings → API di dashboard Supabase.
   ============================================================ */

const SUPABASE_URL      = 'https://dyrrdkitddoucpqcogvo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5cnJka2l0ZGRvdWNwcWNvZ3ZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzMzI3MDUsImV4cCI6MjA5MzkwODcwNX0.MiGcNJg3IIPf3FMkmRxjTia6O34lWWE6gIBNLbV3v2c';

// Inisialisasi client (gunakan window.supabase jika library dimuat via CDN)
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);