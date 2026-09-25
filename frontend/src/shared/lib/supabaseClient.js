const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);

export async function supabaseRequest(path, options = {}) {
  if (!hasSupabaseConfig) {
    throw new Error("Configure o Supabase no arquivo .env antes de usar esta tela.");
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Erro ao comunicar com o Supabase.");
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}
