import leliel from './img/leliel.webp';
import kirby from './img/kirby.png';
import ramiel from './img/ramiel.webp';
import pomni from './img/pomni.jpg';
import aperture from './img/aperture.png'

const data = {
  icons: [
    {
      key: 0,
      _src: leliel
    },
    {
      key: 1,
      _src: kirby
    },
    {
      key: 2,
      _src: ramiel
    },
    {
      key: 3,
      _src: pomni
    },
    {
      key: 4,
      _src: aperture
    }
  ],
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

export default data;
