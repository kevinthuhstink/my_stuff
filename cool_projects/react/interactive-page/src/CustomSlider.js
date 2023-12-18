import React from 'react'

/* PROJECT 5.1
 * Reinventing input type="range"
 */
export default function Slider( props ) {
  const { id, max, min, value, containerStyle, bodyStyle, thumbStyle } = props.sliderStyle;

  return (
    <div className="slider--container" id={id} style={containerStyle}>
      <label>
        {props.labelText}
      </label>
      <div className="slider--body" style={bodyStyle}>
        <div className="slider--thumb" style={thumbStyle} draggable={true} />
      </div>
    </div>
  );
}
