import { useContext, useEffect } from "react"
import { PageLayout } from '@/layout/PageLayout'
import { Card } from "@/features/spotify_cards/components"
import { SpotifyAccessToken, getAccessToken, getPlaylistItems, SpotifyTrack } from "@/features/spotify_cards/api"
import { SpotifyAuthContext } from "@/contexts/SpotifyAuthContext"
import './styles/TodoList.scss'

export function SpotifyCards() {

  const { accessToken, tokenExpiresIn } = useContext(SpotifyAuthContext)

  const pageSetup = {
    title: "Spotify Cards",
    sidebarTitle: "2: Reusable Components",
    description: `In the process of making my first interactive page, this was my
                  real first challenge in React. I had to figure out what a prop
                  was and how to pass them into reusable components. Of course,
                  now that I'm redoing these pages, I'll step up my game and do a
                  little more than basic cards.`
  }

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken")
    const currentTime = new Date().getTime() / 1000

    const tokenExpiration = localStorage.getItem("accessTokenExpiration")
    tokenExpiresIn.current = tokenExpiration ? Number.parseInt(tokenExpiration) - currentTime : 0

    const tokenTimerInterval = setInterval(() => {
      if (!accessToken || !tokenExpiration)
          return null!
      tokenExpiresIn.current = tokenExpiresIn.current - 60
      console.log(`token expires in:\n${tokenExpiresIn.current} seconds`)
    }, 60000)

    if (!storedToken || tokenExpiresIn.current < 300) {
      getAccessToken()
        .then((res: SpotifyAccessToken) => {
          accessToken.current = res.access_token
          console.log(res)

          localStorage.setItem("accessToken", res.access_token)
          localStorage.setItem("accessTokenExpiration", (currentTime + res.expires_in).toString())
        })
        .catch((error: Error) => console.log(error.message))
    }

    else {
      accessToken.current = storedToken,
      console.log(`no action on accessToken\n\n${storedToken}\n\nexpires in ${tokenExpiresIn.current} seconds`)
    }

    return () => clearInterval(tokenTimerInterval)
  }, [accessToken, tokenExpiresIn])

  useEffect(() => {
    getPlaylistItems(accessToken.current)
      .then((res: SpotifyTrack[]) => console.log(res))
      .catch((error: Error) => console.log(error.message))
  }, [accessToken])

  return (
    <PageLayout {...pageSetup}>
      <h1>Grab a random song from my playlist!</h1>
      <button />
      <Card title="test" image="test" explicit={true} />
    </PageLayout>
  )
}
