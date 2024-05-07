import { useState, useContext, useEffect } from "react"
import { PageLayout } from '@/layout/PageLayout'
import { Card } from "@/features/spotify_cards/components"
import { getAccessToken, getPlaylistItems, SpotifyTrack } from "@/features/spotify_cards/api"
import { SpotifyAuthContext } from "@/contexts/SpotifyAuthContext"
import './styles/TodoList.scss'

export function SpotifyCards() {

  const { accessToken, tokenExpiresIn } = useContext(SpotifyAuthContext)
  const [tracks, setTracks] = useState<SpotifyTrack[]>([])
  const [selectedTracks, setSelectedTracks] = useState<number[]>([])

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken")
    const currentTime = new Date().getTime() / 1000

    const tokenExpiration = localStorage.getItem("accessTokenExpiration")
    tokenExpiresIn.current = tokenExpiration ? Number.parseInt(tokenExpiration) - currentTime : 0

    async function fetchAccessToken() {
      const token = await getAccessToken()
      accessToken.current = token.access_token
      tokenExpiresIn.current = token.expires_in
      console.log(token)
    }

    async function fetchPlaylistItems() {
      const tracks = await getPlaylistItems(accessToken.current)
      setTracks(tracks)
      console.log(tracks)
    }

    const tokenTimerInterval = setInterval(() => {
      if (!accessToken || !tokenExpiration)
          return null!
      tokenExpiresIn.current = tokenExpiresIn.current - 60
      console.log(`token expires in:\n${tokenExpiresIn.current} seconds`)

      if (tokenExpiresIn.current < 300)
        fetchAccessToken()
    }, 60000)

    if (!storedToken || tokenExpiresIn.current < 300) {
      fetchAccessToken().then(fetchPlaylistItems)
    }

    else {
      accessToken.current = storedToken,
      console.log(`no action on accessToken\n\n${storedToken}\n\nexpires in ${tokenExpiresIn.current} seconds`)
      fetchPlaylistItems()
    }

    return () => {
      clearInterval(tokenTimerInterval)
      localStorage.setItem("accessToken", accessToken.current)
      const currentTime = new Date().getTime() / 1000
      localStorage.setItem("accessTokenExpiration", `${currentTime + tokenExpiresIn.current}`)
    }
  }, [accessToken, tokenExpiresIn])

  const pageSetup = {
    title: "Spotify Cards",
    sidebarTitle: "2: Reusable Components",
    description: `In the process of making my first interactive page, this was my
                  real first challenge in React. I had to figure out what a prop
                  was and how to pass them into reusable components.`
  }

  const randint = (max: number) => Math.floor(Math.random() * max)
  function addTrack() {
    const trackNum = randint(tracks.length)
    setSelectedTracks([trackNum].concat(selectedTracks))
    console.log(selectedTracks)
  }

  return (
    <PageLayout {...pageSetup}>
      <h1>Grab a random song from my playlist!</h1>
      <button onClick={addTrack}>Add a track!</button>
      <Card title="test" image="test" explicit={true} />
    </PageLayout>
  )
}
