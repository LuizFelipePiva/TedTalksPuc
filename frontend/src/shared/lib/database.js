import { supabaseRequest } from "./supabaseClient";

export async function loginUser(username, password) {
  const query = new URLSearchParams({
    select: "id,username,role",
    username: `eq.${username.trim()}`,
    password: `eq.${password}`,
    limit: "1",
  });
  const users = await supabaseRequest(`app_users?${query}`);

  return users[0] ?? null;
}

export async function createTeacherUser(username, password) {
  const createdUsers = await supabaseRequest("app_users?select=id,username,role,created_at", {
    method: "POST",
    headers: {
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      username: username.trim(),
      password,
      role: "teacher",
    }),
  });

  return createdUsers[0];
}

export async function listTeacherUsers() {
  const query = new URLSearchParams({
    select: "id,username,role,created_at",
    role: "eq.teacher",
    order: "created_at.desc",
  });

  return supabaseRequest(`app_users?${query}`);
}

export async function getTopicsByUser(userId) {
  const query = new URLSearchParams({
    select: "id,topic_1,topic_2,topic_3,topic_4,topic_5",
    user_id: `eq.${userId}`,
    limit: "1",
  });
  const rows = await supabaseRequest(`professor_topics?${query}`);
  const row = rows[0];

  return row
    ? [row.topic_1, row.topic_2, row.topic_3, row.topic_4, row.topic_5].map(
        (topic) => topic ?? "",
      )
    : ["", "", "", "", ""];
}

export async function saveTopicsForUser(userId, topics) {
  const payload = {
    user_id: userId,
    topic_1: topics[0]?.trim() || null,
    topic_2: topics[1]?.trim() || null,
    topic_3: topics[2]?.trim() || null,
    topic_4: topics[3]?.trim() || null,
    topic_5: topics[4]?.trim() || null,
    updated_at: new Date().toISOString(),
  };

  const query = new URLSearchParams({
    select: "id",
    user_id: `eq.${userId}`,
    limit: "1",
  });
  const existingRows = await supabaseRequest(`professor_topics?${query}`);

  if (existingRows.length > 0) {
    await supabaseRequest(`professor_topics?user_id=eq.${userId}`, {
      method: "PATCH",
      headers: {
        Prefer: "return=minimal",
      },
      body: JSON.stringify(payload),
    });
    return;
  }

  await supabaseRequest("professor_topics", {
    method: "POST",
    headers: {
      Prefer: "return=minimal",
    },
    body: JSON.stringify(payload),
  });
}
