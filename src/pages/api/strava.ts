import type { APIRoute } from "astro";

export const prerender = false;

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json",
      // cache 10 min côté CDN pour ne pas marteler l'API Strava (rate limits)
      "cache-control": "public, s-maxage=600, stale-while-revalidate=1800",
    },
  });

export const GET: APIRoute = async () => {
  const clientId = import.meta.env.STRAVA_CLIENT_ID;
  const clientSecret = import.meta.env.STRAVA_CLIENT_SECRET;
  const refreshToken = import.meta.env.STRAVA_REFRESH_TOKEN;

  // Pas encore configuré → la carte Sport reste sur sa description (fallback propre)
  if (!clientId || !clientSecret || !refreshToken) return json({ configured: false });

  try {
    // 1) Rafraîchir le token d'accès (le secret ne quitte jamais le serveur)
    const tokRes = await fetch("https://www.strava.com/oauth/token", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
    });
    if (!tokRes.ok) return json({ configured: true, error: "auth" });
    const tok = (await tokRes.json()) as { access_token?: string };
    if (!tok.access_token) return json({ configured: true, error: "auth" });

    // 2) Lundi de la semaine courante (heure locale FR ~ UTC, suffisant ici)
    const now = new Date();
    const mondayOffset = (now.getUTCDay() + 6) % 7; // lundi = 0
    const monday = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - mondayOffset, 0, 0, 0));
    const after = Math.floor(monday.getTime() / 1000);

    const actRes = await fetch(`https://www.strava.com/api/v3/athlete/activities?after=${after}&per_page=30`, {
      headers: { authorization: `Bearer ${tok.access_token}` },
    });
    if (!actRes.ok) return json({ configured: true, error: "activities" });
    const raw = (await actRes.json()) as Array<Record<string, any>>;

    // 3) On ne renvoie QUE des champs sûrs (pas de GPS, pas de tracé, pas de lieu)
    const activities = raw.slice(0, 12).map((a) => ({
      name: typeof a.name === "string" ? a.name : "Activité",
      type: a.sport_type || a.type || "Workout",
      distanceKm: +(((a.distance as number) || 0) / 1000).toFixed(1),
      timeMin: Math.round(((a.moving_time as number) || 0) / 60),
      date: a.start_date_local || a.start_date || null,
    }));

    const distanceKm = +activities.reduce((s, a) => s + a.distanceKm, 0).toFixed(1);
    const timeMin = activities.reduce((s, a) => s + a.timeMin, 0);
    const types = Array.from(new Set(activities.map((a) => a.type)));

    return json({
      configured: true,
      week: { count: activities.length, distanceKm, timeMin, types },
      activities,
    });
  } catch {
    return json({ configured: true, error: "fetch" });
  }
};
