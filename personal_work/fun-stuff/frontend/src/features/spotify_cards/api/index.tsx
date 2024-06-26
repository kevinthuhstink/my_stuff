import { CLIENT_SECRET } from "./env"

export const SPOTIFY_API_URL = (endpoint: string) => `https://api.spotify.com/v1/${endpoint}`
export const PLAYLIST_ID = "0KyB05fPXuBrPLk9qYEd9k"
const CLIENT_ID = "4f80712bc2f0455ebe7a607270924642"
const API_TOKEN_URL = "https://accounts.spotify.com/api/token"

export const DEFAULT_REQUEST = {
  market: "ES",
  fields: "items(track(href,name,id))"
}

export type SpotifyAccessToken = {
  access_token: string,
  token_type: string,
  expires_in: number
}

export type SpotifyTrack = {
  album: {
    release_date: string,
    images: { url: string }[]
  },
  duration_ms: number,
  explicit: boolean,
  id: string,
  name: string
}

export async function getAccessToken(): Promise<SpotifyAccessToken> {
  const res = await fetch(API_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET
    })
  })

  if (res.status !== 200)
    throw res

  const data = await res.json()
  return data
}

export async function getPlaylistItems(accessToken: string): Promise<SpotifyTrack[]> {
  const API_LINK = SPOTIFY_API_URL(`playlists/${PLAYLIST_ID}/tracks`)

  const getNumTracks = await fetch(API_LINK, {
    method: "GET",
    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  })

  if (getNumTracks.status !== 200)
    throw getNumTracks
  const numTracks: number = (await getNumTracks.json()).total

  const tracks: SpotifyTrack[] = []
  for (let i = 0; i <= numTracks / 100; i++) {
    const query = new URLSearchParams({
      limit: "100",
      offset: `${i * 100}`,
      fields: "items(track(album(release_date,images(url)),duration_ms,explicit,id,name))"
    })

    const trackBatch = await fetch(API_LINK + '?' + query, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken
      }
    })

    if (trackBatch.status !== 200)
      throw trackBatch

    const trackData = (await trackBatch.json()).items
    trackData.forEach((track: { track: SpotifyTrack }) => tracks.push(track.track))
  }

  return tracks
}
