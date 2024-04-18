import { useState, useEffect } from "react"
import { PageLayout } from '@/layout/PageLayout'
import { Card } from "@/features/spotify_cards/components"
import { AccessToken, getAccessToken } from "@/features/spotify_cards/api"
import './styles/TodoList.scss'

export function SpotifyCards() {

  const [accessToken, setAccessToken] = useState<string>(null!)

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
    getAccessToken()
      .then((res: AccessToken) => {
        setAccessToken(res.access_token)
      })
  }, [])

  return (
    <PageLayout {...pageSetup}>
      <h1>Grab a random song from my playlist!</h1>
      <button />
      <Card title="test" image="test" explicit={true} />
    </PageLayout>
  )
}