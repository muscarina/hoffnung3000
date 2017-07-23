export default {
  common: {
    errors: {
      required: 'This field is required',
      minLength: 'This field needs a minimum of {len} characters',
      maxLength: 'This field can\'t be longer than {len} characters',
    },
    basicInformation: 'Basic information',
  },
  place: {
    errors: {
      cityCodeRequired: 'The given address is incomplete. Please fill in the city code field',
      cityRequired: 'The given address is incomplete. Please fill in the city field',
      countryRequired: 'The given address is incomplete. Please fill in the country field',
      descriptionMinLength: 'The description needs a minimum of {len} characters',
      descriptionRequired: 'Describe your place a little',
      gpsCoordinatesRequired: 'No GPS coordinates are specified',
      slotSizeMaximum: 'The slot-size is too large',
      slotSizeMinimum: 'The slot-size is too small',
      slotSizeRequired: 'Please specify a slot size',
      slotSizeWrongFormat: 'The slot-size has a wrong format',
      streetRequired: 'The given address is incomplete. Please fill in the street field',
      titleMinLength: 'The title has to have a minimum of {len} characters',
      titleRequired: 'Please give your place a title',
    },
    areEventsPublic: 'Events in this place are visible in the calendar',
    description: 'Describe your place',
    publicOrPrivate: 'Is it public or private?',
    slots: 'When is it bookable?',
    slotSizeNote: 'Other participants will be able to reserve so called slots in your place. Here you can define how long one slot is.',
    submit: 'Done!',
    title: 'Title of your place',
    where: 'Where is it?',
  },
  resource: {
    errors: {
      descriptionRequired: 'Describe your resource a little',
      titleRequired: 'Please give your resource a title',
    },
    description: 'Describe your resource briefly',
    submit: 'Done. Save it!',
    title: 'Title of your resource',
  },
  event: {
    errors: {
      descriptionRequired: 'Sorry, your description is missing',
      selectPlace: 'Please select a place for your event',
      selectPlaceAndTime: 'You did\'t select any time or place for your event',
      selectTime: 'Please select a time slot for your event',
      titleRequired: 'Please give your event a title',
    },
    areEventsPublic: 'This event is visible in the calendar and to the public',
    description: 'Description',
    pickResources: 'Which resources?',
    placeIsPrivate: 'Please note that the selected place is already private',
    publicOrPrivate: 'Is it public or private?',
    submit: 'Save event',
    title: 'Title of your event',
    what: 'What?',
    whereAndWhen: 'Where and when?',
  },
}
