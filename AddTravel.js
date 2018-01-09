import Col from 'react-bootstrap/lib/Col'
import PageHeader from 'react-bootstrap/lib/PageHeader'
import React from 'react'
import  Row from 'react-bootstrap/lib/Row'
import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'
import DateInput from './DateInput'
import FormField from './FormField'
import LoadingButton from './LoadingButton'
import TextInput from './TextInput'
import CloseButton from './CloseButton'

var TODAY = new Date()

var mapStateToProps = state => state

var form = reduxForm({
  form: 'addTravel',
  fields: ['firstName','lastName','startDate', 'endDate', 'origin', 'destination', 'hotel', 'localTour'],
  touchOnChange: true, // react-widgets DateTimePicker doesn't blur
  validate(travel) {
    var errors = {}
    if (!travel.firstName) errors.firstName = 'Please enter a First Name.'
    if (!travel.lastName) errors.lastName = 'Please enter a Last Name.'
    if (!travel.startDate) errors.startDate = 'Please enter a start date.'
    if (!travel.endDate) errors.endDate = 'Please enter an end date.'
    if (travel.startDate && travel.endDate &&
        travel.endDate < travel.startDate) {
      errors.endDate = 'End date must not be earlier than start date.'
    }
    if (!travel.origin) errors.origin = 'Please enter an origin.'
    if (!travel.destination) errors.destination = 'Please enter a destination.'
    if (!travel.hotel) errors.hotel = 'Please enter a Hotel Name or N/A.'
    return errors
  }
})

var AddTravel = React.createClass({
  getInitialState() {
    return {
      saving: false,
      submitted: null
    }
  },
  componentWillMount() {
    this.props.initializeForm({
      firstName: '',
      lastName: '',
      startDate: null,
      endDate: null,
      origin: '',
      destination: '',
      hotel: '',
      localTour: 'no'
    })
  },
  
  handleStartDateChange(startDate) {
    var {endDate} = this.props.fields
    if (endDate.value == null || endDate.value < startDate) {
      endDate.onChange(startDate)
    }
  },
  
  handleSubmit(data) {
    this.setState({saving: true, submitted: data})
    setTimeout(() => this.setState({saving: false}), 2000)
    document.getElementById("myForm").reset();
    this.props.initializeForm({
      startDate: null,
      endDate: null
    })
  },

  render() {
    var {fields} = this.props
    var {saving, submitted} = this.state
    return <div className="container">
      <PageHeader>Journey Planner</PageHeader>
      <form className="form-horizontal" id="myForm" onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        <Row>
          <TextInput
            disabled={saving}
            field={fields.firstName}
            id="firstName"
            label="First Name:"
          />
          <TextInput
            disabled={saving}
            field={fields.lastName}
            label="Last Name:"
            id="lastName"
          />
        </Row>
        <Row>
          <DateInput
            afterChange={this.handleStartDateChange}
            disabled={saving}
            field={fields.startDate}
            id="startDate"
            label="From:"
            min={TODAY}
          />
          <DateInput
            disabled={saving}
            field={fields.endDate}
            id="endDate"
            label="To:"
            min={fields.startDate.value || TODAY}
          />
        </Row>
        <Row>
          <TextInput
            disabled={saving}
            field={fields.origin}
            id="origin"
            label="Origin:"
          />
          <TextInput
            disabled={saving}
            field={fields.destination}
            label="Destination:"
            id="destination"
          />
        </Row>
        <Row>
          <TextInput
            disabled={saving}
            field={fields.hotel}
            help="Please enter name of hotel here. If no hotel booking exists or unknown put 'N/A'"
            id="hotel"
            label="Hotel:"
          />
          <FormField help="Click on 'Yes' if you have plans for local tour, else click on 'No'."
                     label="Local Tour:">
            <label className="radio-inline">
              <input type="radio" name="localTour" value="yes" onChange={fields.localTour.onChange} disabled={saving}/> Yes
            </label>
            <label className="radio-inline">
              <input type="radio" name="localTour" value="no" onChange={fields.localTour.onChange} defaultChecked disabled={saving}/> No
            </label>
          </FormField>
        </Row>
        <Row className="form-group">
          <Col sm={12} className="text-center">
            <LoadingButton
              bsSize="large"
              bsStyle="primary"
              label="Book Ticket"
              loading={saving}
              loadingLabel="Booking Ticket"
              type="submit"
            />
          </Col>
        </Row>
        {submitted && <pre><code>{JSON.stringify(submitted, null, 2)}</code></pre>}
      </form>
    </div>
  }
})

module.exports = connect(mapStateToProps)(form(AddTravel))
