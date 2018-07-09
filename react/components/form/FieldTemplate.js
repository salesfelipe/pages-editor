import PropTypes from 'prop-types'
import React from 'react'

const hasFieldToBeDisplayed = (field, isLayoutMode) => {
  return field.type === 'object'
    ? Object.keys(field.properties).reduce(
      (acc, currKey) =>
        hasFieldToBeDisplayed(field.properties[currKey], isLayoutMode) || acc,
      false
    )
    : !!field.isLayout === isLayoutMode
}

const FieldTemplate = ({
  children,
  classNames,
  formContext,
  hidden,
  schema,
}) => {
  const isHidden =
    hidden ||
    (schema.type !== 'object' && formContext.isLayoutMode != null && !!schema.isLayout !== formContext.isLayoutMode)

  if (isHidden) {
    return null
  }

  if (hasFieldToBeDisplayed(schema, formContext.isLayoutMode)) {
    return <div className={`${classNames} w-100`}>{children}</div>
  }
  return null
}

FieldTemplate.defaultProps = {
  classNames: '',
  hidden: false,
}

FieldTemplate.propTypes = {
  children: PropTypes.element,
  classNames: PropTypes.string,
  formContext: PropTypes.shape({
    isLayoutMode: PropTypes.bool,
  }),
  hidden: PropTypes.bool,
  schema: PropTypes.object.isRequired,
}

export default FieldTemplate
