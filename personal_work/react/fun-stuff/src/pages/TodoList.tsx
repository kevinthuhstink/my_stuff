import { useState, useEffect } from "react"
import { PageLayout } from '@/layout/PageLayout'
import { ListItem } from '@/components/ListItem'
import './styles/TodoList.scss'

export function TodoList() {

  const [crossed, setCrossed] = useState<number[]>([])

  useEffect(() => {
    setCrossed(() => {
      const storageCrossed = localStorage.getItem("todoCrossed")
      return storageCrossed ? JSON.parse(storageCrossed) : []
    })

    return localStorage.setItem("todoCrossed", JSON.stringify(crossed))
  }, [])

  function toggleCrossed(id: number) {
    if (crossed.some(elem => elem === id))
      setCrossed(prevCrossed => prevCrossed.filter(elem => elem !== id))
    else
      setCrossed(prevCrossed => prevCrossed.concat([id]))
  }

  const pageSetup = {
    title: "Todo List",
    sidebarTitle: "1: Static Page",
    description: `This was one of my first web development projects in forever.
                  I used this page to relearn a lot of CSS that I've long forgotten,
                  and learned some new CSS stuff along the way,
                  namely flexbox and gradients.`,
  }

  const listText = [
    "Git",
    "ReactJS",
    "CSS Frameworks",
    "JSON API",
    "NodeJS",
    "MySQL/MongoDB",
    "AWS/Google Cloud",
    "Self Study Projects",
    "Freelance Work"
  ]

  const listItems = listText.map((elem, index) =>
    <ListItem
      key={index}
      text={elem}
      crossed={crossed.some(elem => elem === index)}
      toggleCrossed={() => toggleCrossed(index)}
    />
  )

  return (
    <PageLayout {...pageSetup}>
      <div>
        <h1 id="todolist-title">TODO:</h1>
        <ol id="todolist-items">
          {listItems}
        </ol>
      </div>
    </PageLayout>
  )
}
