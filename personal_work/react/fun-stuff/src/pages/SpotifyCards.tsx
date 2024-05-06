import { useContext, useEffect } from "react"
import { PageLayout } from '@/layout/PageLayout'
import { Card } from "@/features/spotify_cards/components"
import { getAccessToken, getPlaylistItems, SpotifyTrack } from "@/features/spotify_cards/api"
import { SpotifyAccessToken, SpotifyAuthContext } from "@/contexts/SpotifyAuthContext"
import './styles/TodoList.scss'

export function SpotifyCards() {

  const { accessToken, setAccessToken } = useContext(SpotifyAuthContext)

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
    const tokenExpiresIn = tokenExpiration ? Number.parseInt(tokenExpiration) - currentTime : 0

    const tokenTimerInterval = setInterval(() => {
      setAccessToken((prevToken: SpotifyAccessToken): SpotifyAccessToken => {
        if (!prevToken || !prevToken.expires_in)
          return null!
        console.log(prevToken.expires_in)
        return {
          ...prevToken,
          expires_in: prevToken.expires_in - 10
        }
      })
    }, 10000)

    if (!storedToken || tokenExpiresIn < 300) {
      getAccessToken()
        .then((res: SpotifyAccessToken) => {
          setAccessToken(res)
          console.log(res)

          localStorage.setItem("accessToken", res.access_token)
          localStorage.setItem("accessTokenExpiration", (currentTime + res.expires_in).toString())
        })
        .catch((error: Error) => console.log(error.message))
    }

    else {
      setAccessToken({
        access_token: storedToken,
        token_type: "Bearer",
        expires_in: tokenExpiresIn
      })
      console.log("no action on accessToken\n\n" + storedToken + "\n\nexpires in " + tokenExpiresIn + " seconds")
    }

    return () => clearInterval(tokenTimerInterval)
  }, [setAccessToken])

  useEffect(() => {
    getPlaylistItems(accessToken.access_token)
      .then((res: SpotifyTrack[]) => console.log(res))
  }, [accessToken.access_token])

  return (
    <PageLayout {...pageSetup}>
      <h1>Grab a random song from my playlist!</h1>
      <button />
      <Card title="test" image="test" explicit={true} />
    </PageLayout>
  )
}
