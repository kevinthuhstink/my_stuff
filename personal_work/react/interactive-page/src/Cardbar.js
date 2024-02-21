import React from 'react'
import leliel from './img/leliel.webp'
import ramiel from './img/ramiel.webp'
import adam from './img/adam.webp'
import sahaquiel from './img/sahaquiel.webp'

/* each card displays one thing and
 * some information regarding that thing
 * i decided to include the eva angels
 */
function Card( props ) {
  return (
    <div className="card">
      { props.img && <img className="card--img" src={props.img} alt=""/> }
      { props.movie && <div className="card--badge">IN MOVIES</div> }
      <h3 className="card--title">{props.title}</h3>
      <p className="card--desc">{props.desc}</p>
      <p className="card--ep">Angel #{props.ep}</p>
    </div>
  )
}

const angeldata = [
  {
    title: "Leliel",
    desc: "Integral to the lore of the show. The angel came, and revealed a character destroyed by his past.",
    img: leliel,
    ep: "12",
    key: 1,
    movie: false
  },
  {
    title: "Ramiel",
    desc: "A fan favorite. People loved watching the shrieking octahedron force out the best in our characters.",
    img: ramiel,
    ep: "5",
    key: 2,
    movie: true
  },
  {
    title: "Adam",
    desc: "The angel behind it all, the one that nearly brought destruction to the world.",
    img: adam,
    ep: "2",
    key: 3,
    movie: true
  },
  {
    title: "Sahaquiel",
    desc: "Not a very special villain, but certainly one that really moved the conflict between our characters forward.",
    img: sahaquiel,
    ep: "10",
    key: 4,
    movie: true
  }
];

/* angeldata contains a list of maps
 * img->image,
 * title->title...
 * angels contains a list of card elements
 * that can be insta-rendered in the final JSX object
 */
export default function Cardbar() {
  const angels = angeldata.map( angel => {
    return <Card {...angel} />
  } );
  return (
    <div className="cardbar">
      {angels}
    </div>
  )
}
