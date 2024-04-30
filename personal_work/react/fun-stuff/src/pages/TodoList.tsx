import { useState, useEffect } from "react"
import { PageLayout } from '@/layout/PageLayout'
import './styles/TodoList.scss'

export function TodoList() {

  const [crossed, setCrossed] = useState<number[]>([])

  useEffect(() => {
    setCrossed(() => {
      const storageCrossed = localStorage.getData("todoCrossed")
      return storageCrossed ? JSON.parse(storageCrossed) : []
    })

    return localStorage.setData("todoCrossed", JSON.stringify(crossed))
  }, [])

  const pageSetup = {
    title: "Todo List",
    sidebarTitle: "1: Static Page",
    description: `This was one of my first web development projects in forever.
                  I used this page to relearn a lot of CSS that I've long forgotten,
                  and learned some new CSS stuff along the way,
                  namely flexbox and gradients.`,
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
