const SPOTIFY_API_URL = "https://accounts.spotify.com/api/token"

export const PLAYLIST_REQUEST = {
  playlist_id: "5RoiU7nEwGT1lHLzz9OuWC",
  market: "ES",
  fields: "total",
}

export const TRACK_REQUEST = {
  market: "ES"
}

export const DEFAULT_REQUEST = {
  playlist_id: "5RoiU7nEwGT1lHLzz9OuWC",
  market: "ES",
  fields: "items(track(href,name,id))"
}

export type AccessToken = {
  access_token: string,
  token_type: string,
  expires_in: number
}

export async function getAccessToken(): Promise<AccessToken> {
  const res = await fetch(SPOTIFY_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: JSON.stringify({
      grant_type: "client_credentials",
      client_id: "4f80712bc2f0455ebe7a607270924642",
      client_secret: "54029521b4a94e14a26b1d90efa9706f"
      })
  })

  if (res.status !== 200)
    throw res

  const data = await res.json()
  return data
}
