import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://dyfvwhrtmlwhryfmvixq.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5ZnZ3aHJ0bWx3aHJ5Zm12aXhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzNTYwMTUsImV4cCI6MjA4NjkzMjAxNX0.Zn-tvSuofHo1w4U12q5onVPp2xA8KE7QoCVVD1KG9Ig'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

