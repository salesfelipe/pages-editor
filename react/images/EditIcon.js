import React, { Component } from 'react'
import PropTypes from 'prop-types'

class EditIcon extends Component {
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
        <g className="nc-icon-wrapper" fill="#fff">
          <path d="M8.1,3.5l-7.8,7.8C0.1,11.5,0,11.7,0,12v3c0,0.6,0.4,1,1,1h3c0.3,0,0.5-0.1,0.7-0.3l7.8-7.8L8.1,3.5z" />
          <path d="M15.7,3.3l-3-3c-0.4-0.4-1-0.4-1.4,0L9.5,2.1l4.4,4.4l1.8-1.8C16.1,4.3,16.1,3.7,15.7,3.3z" />
        </g>
      </svg>
    )
  }
}

EditIcon.propTypes = {
  fill: PropTypes.string,
}

export default EditIcon
