import PropTypes from 'prop-types'
import React, { Fragment } from 'react'

const ObjectFieldTemplate = ({
  idSchema: { $id: id },
  properties,
  required,
  title,
}) => {
  return (
    <Fragment>
      {title && (
        <label className="db f6 gray" htmlFor={id}>
          {title}
          {required && '*'}
        </label>
      )}
      {properties.map(property => property.content)}
    </Fragment>
  )
}

ObjectFieldTemplate.defaultProps = {
  properties: [],
  required: false,
  title: '',
}

ObjectFieldTemplate.propTypes = {
  formContext: PropTypes.shape({
    isLayoutMode: PropTypes.bool,
  }),
  idSchema: PropTypes.object.isRequired,
  properties: PropTypes.array,
  required: PropTypes.bool,
  schema: PropTypes.object.isRequired,
  title: PropTypes.string,
}

export default ObjectFieldTemplate
