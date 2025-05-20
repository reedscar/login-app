import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pewfrdimuznfxactxteb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBld2ZyZGltdXpuZnhhY3R4dGViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3NjkxNTYsImV4cCI6MjA2MzM0NTE1Nn0.hE9wzM6aFYIoKG-_YESdMJaQnokSXAvTngM8Mxyfcs0'

export const supabase = createClient(supabaseUrl, supabaseKey)
