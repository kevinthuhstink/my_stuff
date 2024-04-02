import { PageLayout } from '@/layout/PageLayout'
import './TodoList.scss'

export function TodoList() {
  return (
    <PageLayout
      title="Todo List"
      navDescription="Main 1: Static Page">
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
