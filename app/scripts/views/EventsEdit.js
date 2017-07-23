import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import getIds from '../utils/getIds'
import flash from '../actions/flash'
import { cachedResource } from '../services/resources'
import { EventForm } from '../forms'
import { fetchResource, updateResource } from '../actions/resources'
import { translate } from '../services/i18n'

class EventsEdit extends Component {
  static propTypes = {
    errorMessage: PropTypes.string.isRequired,
    fetchResource: PropTypes.func.isRequired,
    flash: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    resourceData: PropTypes.object.isRequired,
    resourceSlug: PropTypes.string.isRequired,
    updateResource: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchResource('events', this.props.resourceSlug)
  }

  onSubmit(values) {
    const updateFlash = {
      text: translate('flash.updateEventSuccess'),
    }

    const { title, description, isPublic } = values

    const requestParams = {
      description,
      isPublic,
      placeId: values.placeSlots.place.id,
      resources: getIds(values.resources),
      slots: values.placeSlots.selectedSlotsIndexes,
      title,
    }

    this.props.updateResource(
      'events',
      this.props.resourceSlug,
      requestParams,
      updateFlash,
      '/calendar'
    )
  }

  renderForm() {
    if (this.props.isLoading) {
      return <p>Loading ...</p>
    }

    if (!this.props.resourceData.isOwnerMe) {
      this.props.flash({
        redirect: '/',
        text: translate('flash.common.unauthorizedView'),
        type: 'error',
      })
    }

    const {
      id,
      description,
      isPublic,
      resources,
      place,
      slots,
      title,
    } = this.props.resourceData

    const selectedSlotsIndexes = slots.map(slot => slot.slotIndex)
    selectedSlotsIndexes.sort((slotA, slotB) => slotA - slotB)

    const initialValues = {
      description,
      isPublic,
      resources,
      placeSlots: {
        place,
        selectedSlotsIndexes,
      },
      title,
    }

    return (
      <EventForm
        errorMessage={this.props.errorMessage}
        eventId={id}
        initialValues={initialValues}
        isSlotSizeVisible={false}
        onSubmit={this.onSubmit}
      />
    )
  }

  renderTitle() {
    if (this.props.isLoading) {
      return <h1>{ translate('views.events.titlePlaceholder') }</h1>
    }
    return <h1>{ this.props.resourceData.title }</h1>
  }

  render() {
    return (
      <section>
        { this.renderTitle() }
        <Link className="button" to="/calendar">
          { translate('common.backToOverview') }
        </Link>
        <hr />
        { this.renderForm() }
      </section>
    )
  }

  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }
}

function mapStateToProps(state, ownProps) {
  const resourceSlug = ownProps.match.params.slug
  const { errorMessage } = state.resources
  const resource = cachedResource('events', resourceSlug)
  const { isLoading, object: resourceData } = resource

  return {
    errorMessage,
    isLoading,
    resourceData,
    resourceSlug,
  }
}

export default connect(
  mapStateToProps, {
    fetchResource,
    flash,
    updateResource,
  }
)(EventsEdit)
