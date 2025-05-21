import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'YOUR URL'
const supabaseKey = 'YOUR KEY'

export const supabase = createClient(supabaseUrl, supabaseKey)
