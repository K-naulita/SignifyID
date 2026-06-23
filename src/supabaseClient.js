import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://jvcwncwenpgkykzcawsu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2Y3duY3dlbnBna3lremNhd3N1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxOTcyNzEsImV4cCI6MjA5Nzc3MzI3MX0.akFfnGBD_DzHJdZMsUPSBDGGDJm76C3kumVUqwjDLuE"
);