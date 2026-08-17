import { supabase } from './supabase';
export async function getSession(){ if(!supabase) return {session:null,error:null}; return supabase.auth.getSession(); }
export async function getProfile(userId){ if(!supabase) return {data:null,error:null}; return supabase.from('profiles').select('*').eq('id',userId).maybeSingle(); }
export async function getSettings(){ if(!supabase) return {data:[],error:null}; return supabase.from('app_settings').select('*'); }
export async function listCourses(){ if(!supabase) return {data:[],error:null}; return supabase.from('courses').select('*,materials(*)').order('created_at',{ascending:false}); }
export async function listTests(){ if(!supabase) return {data:[],error:null}; return supabase.from('tests').select('*,test_questions(*)').order('created_at',{ascending:false}); }
export async function signOut(){ return supabase?.auth.signOut(); }
