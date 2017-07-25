import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { asInfiniteListItem, withUserState } from '../containers'
import { formatEventTime } from '../utils/dateFormat'

class CuratedEventListItem extends Component {
  static propTypes = {
    isActive: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    item: PropTypes.object.isRequired,
  }

  renderPlaceName() {
    if (!this.props.isAuthenticated || !this.props.isActive) {
      return null
    }

    return (
      <div className="list-item-content__description ellipsis">
        { this.props.item.place.title }
      </div>
    )
  }

  renderEventTime() {
    const slots = this.props.item.slots
    const firstSlot = slots[0]
    const lastSlot = slots[slots.length - 1]

    return formatEventTime(firstSlot.from, lastSlot.to)
  }

  render() {
    return (
      <div className="list-item-content">
        <div className="list-item-content__title ellipsis">
          { this.props.item.title }
        </div>
        <div className="list-item-content__subtitle ellipsis">
          { this.renderEventTime() }
        </div>
        { this.renderPlaceName() }
      </div>
    )
  }
}

export default asInfiniteListItem(withUserState(CuratedEventListItem))