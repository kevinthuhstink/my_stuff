import { PageLayout } from '@/layout/PageLayout'
import "./styles/LoadingPage.scss"

interface LoadingPageProps {
  message?: string
}

export function LoadingPage({ message }: LoadingPageProps) {
  return (
    <PageLayout title="Loading Page" description="loading" bare={true}>
      <div id="loading-wrapper">
        <h1 id="loading-message">{message ? message : "loading..."}</h1>
      </div>
    </PageLayout>
  )
}
