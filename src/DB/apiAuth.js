import supabase, { supabaseUrl } from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
export async function getCurrentUser() {
  const { data: session, error } = await supabase.auth.getSession();
  if (!session.session) return null;
  if (error) throw new Error(error.message);

  return session.session?.user;
}

export async function signUp({ name, email, password, profile_pic }) {
  const filename = `dp-${name.split(" ").join("-")}-${Math.floor(
    Math.random() * 100
  )}`;
  const { error: storageError } = await supabase.storage
    .from("profile_pic")
    .upload(filename, profile_pic);

  if (storageError) {
    throw new Error(storageError.message);
  }
  const { data, error } = supabase.auth({
    email,
    password,
    Options: {
      data: {
        name,
        profile_pic: `${supabaseUrl}/storage/v1/object/public/profile_pic/${filename}`,
      },
    },
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
