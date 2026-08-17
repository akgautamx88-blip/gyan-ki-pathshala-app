# ज्ञान की पाठशाला — PWA

React + Vite + Tailwind CSS + Lucide React + Supabase starter, designed for Akash Sir.

## Run
1. Copy `.env.example` to `.env` and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
2. Run the SQL in `supabase/schema.sql` in Supabase SQL Editor.
3. `npm install`
4. `npm run dev` or `npm run build`

## Important production notes
- Never put a Supabase service-role key in the browser.
- For real PDF watermarking, use server/Edge Function generated signed URLs or a PDF rendering layer; CSS watermarks alone are not DRM.
- Configure Storage buckets and restrictive RLS policies before accepting student uploads.
- Add an admin role check on every privileged mutation, preferably through Postgres policies or Edge Functions.
