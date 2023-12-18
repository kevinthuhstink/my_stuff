import React from 'react'

/* PROJECT 4.1
 * Reinventing input type="range"
 */
function Slider( props ) {
  const { id, min, max, value, pos, labelText } = props.sliderData;
  const { thumbStyle } = props.sliderStyle;
  const sliderProps = {
    id: id,
    min: min,
    max: max,
    value: value,
  };

  return (
    <div className="slider--container" {...sliderProps}>
      <label>
        {labelText}
      </label>
      <div className="slider--body">
        <div className="slider--thumb" style={{...thumbStyle, left: `${pos}%` }} draggable='true' />
      </div>
    </div>
  );
}

function initSliders( setValues ) {
  //setValues is the setState function for the slider data in Main

  const sliders = document.getElementsByClassName( "slider--container" );
  for ( var slider of sliders ) {
    const sliderThumb = slider.getElementsByClassName( "slider--thumb" )[0];
    const sliderBody = slider.getElementsByClassName( "slider--body" )[0];
    sliderThumb.addEventListener( "mousedown", handleSlider );
    sliderBody.addEventListener( "click", handleSliderClick );
  }

  function handleSlider( event ) {
    event.preventDefault();
    const sliderThumb = event.target;
    const slider = sliderThumb.parentElement.parentElement;
    const dragSlider = event => moveSlider( event, slider );
    //anon funcs are unremovable because react doesn't know how else to "reference" the function when removing event listeners
    document.addEventListener( "mousemove", dragSlider );
    document.addEventListener( "mouseup", stopDrag );
    //document is required because it means sliderThumb follows the mouse anywhere in the document
    //rather than when the mouse is only in the sliderThumb div

    function stopDrag( event ) {
      document.removeEventListener( "mousemove", dragSlider );
      document.removeEventListener( "mouseup", stopDrag );
    }
  }

  function handleSliderClick( event ) {
    event.preventDefault();
    var slider = event.target.parentElement;
    if ( slider.className === "slider--body" )
      slider = slider.parentElement;
    moveSlider( event, slider );
  }

  function moveSlider( event, slider ) {
    event.preventDefault();
    //physically move the slider and update its value
    //works for both drag and click
    const sliderBody = slider.getElementsByClassName( "slider--body" )[0];
    const { left, right, width } = sliderBody.getBoundingClientRect();
    const mousePos = event.screenX;
    if ( mousePos < left || mousePos > right )
      return; //set bounds

    function updateSliderValues( thisSlider ) {
      const newPos = ( mousePos - left - 6 ) / width;
      const newVal = thisSlider.min + newPos * ( thisSlider.max - thisSlider.min );
      return {
        ...thisSlider,
        pos: newPos * 100,
        value: newVal,
      }
    }

    setValues( prevValues => ( {
      ...prevValues,
      [slider.id]: updateSliderValues( prevValues[slider.id] ),
    } ) );
  }

  return cleanupEffects;
  function cleanupEffects() {
    for ( var slider of sliders ) {
      const sliderThumb = slider.getElementsByClassName( "slider--thumb" )[0];
      const sliderBody = slider.getElementsByClassName( "slider--body" )[0];
      sliderThumb.removeEventListener( "mousedown", handleSlider );
      sliderBody.removeEventListener( "click", handleSliderClick );
    }
  }
}

const sliderMechanics = [ Slider, initSliders ];
export default sliderMechanics
