import React from 'react'

export default function Slider( props ) {
  const sliderticksID = props.id + "Ticks";
  function Sliderticks() {
    return (
      <datalist id={sliderticksID}>
        <option value={props.min} label={props.min}></option>
        <option value={props.max} label={props.max}></option>
      </datalist>
    )
  }
  return (
    <div className="slider--builtin">
      <label for={props.id}>
        {props.labelText}
      </label>
      <input type="range"
        className="slider"
        min={props.min}
        max={props.max}
        step={props.step}
        value={props.value}
        onChange={props.handleSlider}
        id={props.id} />
      <Sliderticks />
    </div>
  )
}
