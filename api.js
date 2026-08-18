import { createClient } from '@supabase/supabase-js';

// यहाँ अपनी Supabase URL और Anon Key डालें
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 1. नया स्टूडेंट रजिस्ट्रेशन
export async function signUpStudent(email, password, fullName, phone) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return { error };

  if (data?.user) {
    const { error: profileError } = await supabase.from('profiles').insert([
      {
        id: data.user.id,
        full_name: fullName,
        phone: phone,
        role: 'student',
        status: 'active',
      },
    ]);
    if (profileError) return { error: profileError };
  }
  return { data };
}

// 2. लॉगिन (स्टूडेंट और एडमिन)
export async function loginUser(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error };

  // यूजर प्रोफाइल और स्टेटस जांचें
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', data.user.id)
    .single();

  if (profile?.status === 'blocked') {
    await supabase.auth.signOut();
    return { error: { message: 'आपका अकाउंट ब्लॉक (Blocked) कर दिया गया है। एडमिन से संपर्क करें।' } };
  }

  if (profile?.status === 'inactive') {
    await supabase.auth.signOut();
    return { error: { message: 'आपका अकाउंट निष्क्रिय (Inactive) है। एडमिन से चालू करवाएं।' } };
  }

  return { data, profile };
}

// 3. पासवर्ड रिसेट लिंक भेजना
export async function resetPassword(email) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);
  return { data, error };
}

// 4. सभी छात्रों की सूची प्राप्त करना (Admin के लिए)
export async function fetchAllStudents() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'student')
    .order('created_at', { ascending: false });
  return { data, error };
}

// 5. स्टूडेंट स्टेटस बदलना (ON / OFF / Block)
export async function updateStudentStatus(studentId, newStatus) {
  const { data, error } = await supabase
    .from('profiles')
    .update({ status: newStatus })
    .eq('id', studentId);
  return { data, error };
}
