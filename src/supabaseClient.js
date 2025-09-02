import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lzunvgmbdophdyigzyky.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6dW52Z21iZG9waGR5aWd6eWt5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3NDU4ODgsImV4cCI6MjA3MjMyMTg4OH0.wpSqusCz7M6ZTpHnQEFXoFtThwV34qA_LNO8RDrFdeA'

export const supabase = createClient(supabaseUrl, supabaseKey)
