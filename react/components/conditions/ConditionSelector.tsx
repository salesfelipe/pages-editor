import PropTypes from 'prop-types'
import { groupBy, prop } from 'ramda'
import React, { Component, Fragment } from 'react'
import { FormattedMessage } from 'react-intl'

import ConditionSection from './ConditionSection'
import LayoutSwitcher from '../LayoutSwitcher';

class ConditionSelector extends Component<{} & RenderContextProps & EditorContextProps> {
  public static propTypes = {
    page: PropTypes.string,
    pages: PropTypes.object,
  }

  public render() {
    const { editor: { conditions, activeConditions, addCondition, removeCondition } } = this.props
    const conditionsByType = groupBy<Condition>(prop('type'), conditions)
    const scopeConditions = conditionsByType.scope
    const deviceConditions = conditionsByType.device

    return (
      <div className="pa4">
        <h3><FormattedMessage id="pages.editor.conditions.title"/></h3>
        <ConditionSection type="scope"
          conditions={scopeConditions}
          activeConditions={activeConditions}
          addCondition={addCondition}
          removeCondition={removeCondition}
          multiple={scopeConditions[0].multiple}
          />
        <div className="mt6">
          <LayoutSwitcher editor={this.props.editor} conditions={deviceConditions} />
        </div>
      </div>
    )
  }
}

export default ConditionSelector
