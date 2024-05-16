import { Links } from '@/components/Links'
import "./styles/Title.scss"

export function Title() {

  const linksStyle = {
    title: "See my (React) work!",
    style: {
      titleStyle: {
        fontSize: "3em",
        fontFamily: "Mukta, sans-serif"
      },
      listStyle: {
      },
      itemStyle: {
        fontSize: "2em"
      }
    }
  }

  return (
    <main id="titlepage">
      <p className="titlepage-description">
        Good evening, my name is
      </p>
      <span id="titlepage-title">kevin cheng</span>
      <Links {...linksStyle} />
    </main>
  )
}
