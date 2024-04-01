import leliel from 'leliel.webp';
import kirby from 'kirby.png';
import ramiel from 'ramiel.webp';
import pomni from 'pomni.jpg';
import aperture from 'aperture.png'
import kevinthuhstink from 'kevinthuhstink.jpg'
import jin from 'jin.jpg'
import joon from 'joon.jpg'
import tyler from 'tyler.jpg'
import josh from 'josh.jpg'
import miles from 'miles.jpg'

export const data = {
  icons: {
    default: [
      { key: 0,
        _src: leliel },
      { key: 1,
        _src: kirby },
      { key: 2,
        _src: ramiel },
      { key: 3,
        _src: pomni },
      { key: 4,
        _src: aperture } ],
    stinky: [
      { key: 0,
        _src: kevinthuhstink },
      { key: 1,
        _src: josh },
      { key: 2,
        _src: tyler },
      { key: 3,
        _src: joon },
      { key: 4,
        _src: miles },
      { key: 5,
        _src: jin } ],
  },
  colors: {
    main: {
      taro: "linear-gradient( 120deg, #e6eaff 30%, white 100% )",
      default: "linear-gradient( 120deg, Lavender, LavenderBlush )",
    },
    header: {
      taro: "linear-gradient( 30deg, #b3baff 40%, #333399 100% )",
      default: "linear-gradient( 120deg, indigo 40%, navy 100% )",
    },
    sidebar: {
      taro: "linear-gradient( 120deg, #ffccff 24%, #6666ff 100% )",
      default: "linear-gradient( 120deg, Plum, SlateBlue )",
    },
  },
  todoList: (
    <div>
      <h1 className="todolist--title">TODO:</h1>
      <ol className="todolist">
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
  )
};
