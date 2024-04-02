import { PageLayoutProps, PageLayout } from '@/layout/PageLayout'
import './styles/TodoList.scss'

export function TodoList() {

  const pageSetup: PageLayoutProps = {
    title: "Todo List",
    description: "Main 1: Static Page",
  }

  return (
    <PageLayout {...pageSetup}>
      <div>
        <h1 id="todolist-title">TODO:</h1>
        <ol id="todolist-items">
          <li>React JS</li>
          <li>TailwindCSS</li>
          <li>NodeJS</li>
          <li>MySQL</li>
          <li>Git</li>
          <li>JSON API</li>
          <li>AWS/Google Cloud</li>
          <li>Self-Study Projects</li>
          <li>Freelance Work</li>
        </ol>
      </div>
    </PageLayout>
  )
}
