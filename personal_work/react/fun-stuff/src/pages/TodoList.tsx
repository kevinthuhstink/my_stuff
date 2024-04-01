import { PageLayout } from '@/layout/PageLayout'

export function TodoList() {
  return (
    <PageLayout
      title="Todo List"
      navDescription="Main 1: Static Page">
      <div>
        <h1>TODO:</h1>
        <ol>
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
