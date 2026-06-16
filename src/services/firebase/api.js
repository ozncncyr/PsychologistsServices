const RTDB_BASE = import.meta.env.VITE_RTDB_URL || "";

export async function getPsychologists(token) {
  if (!RTDB_BASE) return [];

  const url = token
    ? `${RTDB_BASE.replace(/\/$/, "")}/psychologists.json?auth=${token}`
    : `${RTDB_BASE.replace(/\/$/, "")}/psychologists.json`;

  const res = await fetch(url);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch psychologists: ${res.status} ${text}`);
  }

  const data = await res.json();

  if (!data) return [];

  return Object.keys(data).map((key) => ({
    id: key,
    ...data[key],
  }));
}

export async function getPsychologistById(id) {
  if (!RTDB_BASE) return null;

  const res = await fetch(
    `${RTDB_BASE.replace(/\/$/, "")}/psychologists/${id}.json`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch psychologist");
  }

  const data = await res.json();

  return data ? { id, ...data } : null;
}

export async function setUserProfile(uid, profile) {
  const url = `${RTDB_BASE.replace(/\/$/, "")}/users/${uid}.json`;

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profile),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to set user profile: ${res.status} ${text}`);
  }

  return await res.json();
}

export async function setUserFavorite(uid, psychologistId) {
  const url =
    `${RTDB_BASE.replace(/\/$/, "")}` +
    `/users/${uid}/favorites/${psychologistId}.json`;

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(true),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to save favorite: ${res.status} ${text}`);
  }
}

export async function removeUserFavorite(uid, psychologistId) {
  const url =
    `${RTDB_BASE.replace(/\/$/, "")}` +
    `/users/${uid}/favorites/${psychologistId}.json`;

  const res = await fetch(url, {
    method: "DELETE",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to remove favorite: ${res.status} ${text}`);
  }
}

export async function getUserFavorites(uid) {
  const url =
    `${RTDB_BASE.replace(/\/$/, "")}` + `/users/${uid}/favorites.json`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to get favorites");
  }

  const data = await res.json();

  return data || {};
}
