import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { alert } from '../services/dialog'
import { translate } from '../services/i18n'

class SlotEditorItem extends Component {
  static propTypes = {
    isBookingMode: PropTypes.bool.isRequired,
    isSlotBookedByMe: PropTypes.bool.isRequired,
    onChangeBookedByMeStatus: PropTypes.func.isRequired,
    onChangeDisabledStatus: PropTypes.func.isRequired,
    slot: PropTypes.object.isRequired,
  }

  onClick() {
    const { isDisabled, eventId } = this.props.slot

    if (this.props.isBookingMode) {
      if (isDisabled) {
        alert(translate('components.slotEditorItem.slotIsDisabledAlert'))
      } else if (eventId !== undefined && !this.props.isSlotBookedByMe) {
        alert(translate('components.slotEditorItem.slotIsBookedAlert'))
      } else if (this.props.isSlotBookedByMe) {
        this.changeIsBookedStatus(false)
      } else {
        this.changeIsBookedStatus(true)
      }
    } else {
      if (eventId) {
        alert(translate('components.slotEditorItem.cantDisableBookedSlot'))
      } else if (isDisabled) {
        this.changeDisabledStatus(false)
      } else {
        this.changeDisabledStatus(true)
      }
    }
  }

  render() {
    const {
      fromTimeStr,
      toTimeStr,
      isDisabled,
      eventId,
    } = this.props.slot

    const slotItemClasses = classnames(
      'slot-editor__item', {
        'slot-editor__item--disabled': isDisabled,
        'slot-editor__item--booked': eventId && !this.props.isSlotBookedByMe,
        'slot-editor__item--booked-by-me': this.props.isSlotBookedByMe,
      }
    )

    return (
      <div className={slotItemClasses} onClick={this.onClick}>
        { fromTimeStr } - { toTimeStr }
      </div>
    )
  }

  changeDisabledStatus(status) {
    this.props.onChangeDisabledStatus(this.props.slot, status)
  }

  changeIsBookedStatus(status) {
    this.props.onChangeBookedByMeStatus(this.props.slot, status)
  }

  constructor(props) {
    super(props)

    this.onClick = this.onClick.bind(this)
  }
}

export default SlotEditorItem