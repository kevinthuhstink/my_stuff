import { Links } from '@/components/Links'

export function Title() {

  const linksStyle = {
    title: "See my work!",
    style: {
      titleStyle: {
        fontSize: "5em",
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
      <h1 id="titlepage-title">kevinthuhstink</h1>
      <p id="titlepage-description">
        I'm a college freshman, looking to make some projects and get work done.
      </p>
      <Links {...linksStyle} />
    </main>
  )
}
