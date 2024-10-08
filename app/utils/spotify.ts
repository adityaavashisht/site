"use server";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const BASIC_TOKEN = Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString(
  "base64"
);
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?limit=1`;
const CURRENTLY_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;

export const getAccessToken = async () => {
  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${BASIC_TOKEN}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN ? REFRESH_TOKEN : "",
    }),
    cache: "no-cache",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(`Failed to fetch access token: ${data.error}`);
  }
  return data.access_token;
};

export const getRecentlyPlayed = async () => {
  const access_token = await getAccessToken();
  const res = await fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return await res.json();
};

export const getNowPlaying = async () => {
  const access_token = await getAccessToken();
  const res = await fetch(CURRENTLY_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (res.status === 204) {
    return null;
  }
  return await res.json();
};
