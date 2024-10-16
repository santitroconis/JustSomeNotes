import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://dwphwibjhzbkabbxskvp.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3cGh3aWJqaHpia2FiYnhza3ZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc1NTgyNzksImV4cCI6MjA0MzEzNDI3OX0.UZazz0Rlt13g0jqZGK3FZB_g99rHAAh4AHY98C6RLcQ"
);
