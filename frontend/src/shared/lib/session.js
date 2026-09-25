const SESSION_KEY = "tedtalkspuc-session";

export function getSession() {
  const storedSession = localStorage.getItem(SESSION_KEY);

  if (!storedSession) {
    return null;
  }

  try {
    return JSON.parse(storedSession);
  } catch {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function saveSession(user) {
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({
      id: user.id,
      username: user.username,
      role: user.role,
    }),
  );
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}
