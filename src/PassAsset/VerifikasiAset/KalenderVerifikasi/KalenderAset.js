import React, { Fragment, Component } from "react";
import {
    Card, CardBody
} from 'reactstrap';

import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import events from './Events'

const localizer = BigCalendar.momentLocalizer(moment)

export default class KalenderAset extends Component {

    eventStyleGetter = (event, start, end, isSelected) => {
        console.log(event);
        var backgroundColor = '#' + event.hexColor;
        var style = {
            backgroundColor: backgroundColor,
            borderRadius: '0px',
            opacity: 0.8,
            color: 'black',
            border: '0px',
            display: 'block'
        };
        return {
            style: style
        };
    }

    render() {

        return (
            <Fragment>
                <Card className="mb-3">
                    <CardBody>
                        <BigCalendar
                            localizer={localizer}
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
                            eventPropGetter={this.eventStyleGetter}
                        />
                    </CardBody>
                </Card>
            </Fragment>
        )
    }
}