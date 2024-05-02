import { useState, useEffect } from "react"
import { PageLayout } from '@/layout/PageLayout'
import { Card } from "@/features/spotify_cards/components"
import { SpotifyAccessToken, getAccessToken } from "@/features/spotify_cards/api"
import './styles/TodoList.scss'

export function SpotifyCards() {

  const [accessToken, setAccessToken] = useState<SpotifyAccessToken>(null!)

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
    const tokenExpiration = localStorage.getItem("accessTokenExpiration")
    const currentTime = new Date().getTime()

    if (!storedToken || !tokenExpiration) {
      getAccessToken()
        .then((res: SpotifyAccessToken) => {
          setAccessToken({
            ...res,
            expires_in: 1000 * res.expires_in
          })
          console.log(res)

          localStorage.setItem("accessToken", res.access_token)
          localStorage.setItem("accessTokenExpiration", (currentTime + 1000 * res.expires_in).toString())
        })
        .catch((error: Error) => console.log(error.message))
      return
    }

    const tokenExpiresIn = Number.parseInt(tokenExpiration) - currentTime

    if (tokenExpiresIn < 600) {
      //refresh token
    }

    else {
      setAccessToken(() => ({
        access_token: storedToken,
        token_type: "Bearer",
        expires_in: tokenExpiresIn
      }))
      console.log(accessToken)
    }
  }, [])

  return (
    <PageLayout {...pageSetup}>
      <h1>Grab a random song from my playlist!</h1>
      <button />
      <Card title="test" image="test" explicit={true} />
    </PageLayout>
  )
}
