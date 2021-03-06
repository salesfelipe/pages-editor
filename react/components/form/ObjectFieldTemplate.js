import PropTypes from 'prop-types'
import React, { Fragment } from 'react'

const hasFieldToBeDisplayed = (field, isLayoutMode) =>
  field.type === 'object'
    ? Object.keys(field.properties).reduce(
      (acc, currKey) =>
        hasFieldToBeDisplayed(field.properties[currKey], isLayoutMode) || acc,
      false
    )
    : !!field.isLayout === isLayoutMode

const ObjectFieldTemplate = ({
  formContext: { isLayoutMode },
  idSchema: { $id: id },
  properties,
  required,
  schema,
  title,
}) =>
  hasFieldToBeDisplayed(schema, isLayoutMode) && (
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

ObjectFieldTemplate.defaultProps = {
  properties: [],
  required: false,
  title: '',
}

ObjectFieldTemplate.propTypes = {
  formContext: PropTypes.shape({
    isLayoutMode: PropTypes.bool.isRequired,
  }).isRequired,
  idSchema: PropTypes.object.isRequired,
  properties: PropTypes.array,
  required: PropTypes.bool,
  schema: PropTypes.object.isRequired,
  title: PropTypes.string,
}

export default ObjectFieldTemplate
