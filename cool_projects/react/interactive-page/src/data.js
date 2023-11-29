import leliel from './img/leliel.webp';
import kirby from './img/kirby.png';
import ramiel from './img/ramiel.webp';
import pomni from './img/pomni.jpg';
import aperture from './img/aperture.png'

const data = {
  "success": true,
  "icons": [
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
  "colors": {
    taroMainBackground: "linear-gradient( 120deg, #e6eaff 30%, white 100% )",
    defaultMainBackground: "linear-gradient( 120deg, Lavender, LavenderBlush )",
    taroHeaderBackground: "linear-gradient( 30deg, #b3baff 40%, #333399 100% )",
    defaultHeaderBackground: "linear-gradient( 120deg, indigo 40%, navy 100% )",
    taroSidebarBackground: "linear-gradient( 120deg, #ffccff 24%, #6666ff 100% )",
    defaultSidebarBackground: "linear-gradient( 120deg, Plum, SlateBlue )",
  }
};

export default data;
