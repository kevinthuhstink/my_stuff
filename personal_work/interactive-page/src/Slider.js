import React from 'react'

/* PROJECT 4.1
 * Reinventing input type="range"
 */
export function Slider(props) {
  const {id, min, max, value, pos, sliderTitle, labels} = props.sliderData
  const {thumbStyle} = props.sliderStyle
  const sliderProps = {
    id: id,
    min: min,
    max: max,
    value: value,
  }

  //creates labels for the slider based on labels array
  var labelObjs = [<option key={0}>{min}</option>]
  if (labels) {
    const extraLabels = labels.map(label => <option key={label.key}>{label.value}</option>)
    labelObjs.push(...extraLabels)
  }
  labelObjs.push(<option key={labelObjs.length}>{max}</option>)

  return (
    <div className="slider--container" {...sliderProps}>
      <label>
        {sliderTitle}
      </label>
      <div className="slider--body">
        <div className="slider--thumb" style={{...thumbStyle, left: `${pos}%` }} draggable='true' />
      </div>
      <dataset>
        {labelObjs}
      </dataset>
    </div>
  )
}

export function initSliders(setValues) {
  //setValues is the setState function for the slider data in Main

  const sliders = document.getElementsByClassName("slider--container")
  for (var slider of sliders) {
    const sliderThumb = slider.getElementsByClassName("slider--thumb")[0]
    const sliderBody = slider.getElementsByClassName("slider--body")[0]
    sliderThumb.addEventListener("mousedown", handleSlider)
    sliderBody.addEventListener("click", handleSliderClick)
  }

  function handleSlider(event) {
    event.preventDefault()
    const sliderThumb = event.target
    const slider = sliderThumb.parentElement.parentElement
    const dragSlider = event => moveSlider(event, slider)
    //anon funcs are unremovable
    document.addEventListener("mousemove", dragSlider)
    document.addEventListener("mouseup", stopDrag)

    function stopDrag(event) {
      document.removeEventListener("mousemove", dragSlider)
      document.removeEventListener("mouseup", stopDrag)
    }
  }

  function handleSliderClick(event) {
    event.preventDefault()
    var slider = event.target.parentElement
    if (slider.className === "slider--body")
      slider = slider.parentElement
    moveSlider(event, slider)
  }

  function moveSlider(event, slider) {
    event.preventDefault()
    const sliderBody = slider.getElementsByClassName("slider--body")[0]
    const {left, right, width} = sliderBody.getBoundingClientRect()
    const mousePos = event.screenX
    if (mousePos < left || mousePos > right)
      return

    function updateSliderValues(thisSlider) {
      const {min, max} = thisSlider
      const newPos = (mousePos - left - 6) / width
      const newVal = min + newPos * (max - min)
      return {
        ...thisSlider,
        pos: newPos * 100,
        value: newVal,
      }
    }

    setValues(prevValues => ({
      ...prevValues,
      [slider.id]: updateSliderValues(prevValues[slider.id]),
    }))
  }

  function cleanupEffects() {
    for (var slider of sliders) {
      const sliderThumb = slider.getElementsByClassName("slider--thumb")[0]
      const sliderBody = slider.getElementsByClassName("slider--body")[0]
      sliderThumb.removeEventListener("mousedown", handleSlider)
      sliderBody.removeEventListener("click", handleSliderClick)
    }
  }
  return cleanupEffects
}
