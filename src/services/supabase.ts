import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://agcanwsdtvtbtvguhnbp.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnY2Fud3NkdHZ0YnR2Z3VobmJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEyMDg5NjQsImV4cCI6MjAxNjc4NDk2NH0.ZEZr3EWzEn5YWXj2A67bXQ4xbRNLMkpct4ShApCkqOA";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
