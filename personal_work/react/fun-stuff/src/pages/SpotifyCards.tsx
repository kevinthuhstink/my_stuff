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
    const currentTime = new Date().getTime() / 1000

    const tokenTimerInterval = setInterval(() => {
      setAccessToken(prevToken => {
        console.log(prevToken.expires_in)
        if (!prevToken.expires_in)
          return null!
        else
          return {
            ...prevToken,
            expires_in: prevToken.expires_in - 10
          }
      })
    }, 10000)

    if (!storedToken || !tokenExpiration) {
      getAccessToken()
        .then((res: SpotifyAccessToken) => {
          setAccessToken(res)
          console.log(res)

          localStorage.setItem("accessToken", res.access_token)
          localStorage.setItem("accessTokenExpiration", (currentTime + res.expires_in).toString())
        })
        .catch((error: Error) => console.log(error.message))

      return () => {
        clearInterval(tokenTimerInterval)
        console.log("endif getAccessToken()")
      }
    }

    const tokenExpiresAt = Number.parseInt(tokenExpiration) - currentTime

    if (tokenExpiresAt < 600) {
      //refresh token
    }

    else {
      setAccessToken(() => ({
        access_token: storedToken,
        token_type: "Bearer",
        expires_in: tokenExpiresAt
      }))
      console.log("no action on accessToken\n\n" + storedToken + "\n\nexpires in " + tokenExpiresAt + " seconds")
    }

    return () => clearInterval(tokenTimerInterval)
  }, [])

  return (
    <PageLayout {...pageSetup}>
      <h1>Grab a random song from my playlist!</h1>
      <button />
      <Card title="test" image="test" explicit={true} />
    </PageLayout>
  )
}
