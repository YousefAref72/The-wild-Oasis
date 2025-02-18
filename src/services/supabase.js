import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://rhvenbxlbdjghuwzlqvs.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJodmVuYnhsYmRqZ2h1d3pscXZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk3ODE1NzEsImV4cCI6MjA1NTM1NzU3MX0.L7oSIIJzprUENRFq1zf6WTi-G2xuU438TGIQX-rttzg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
