import React from 'react';
import DayPicker from 'react-day-picker';

import 'react-day-picker/lib/style.css';

export default class BasicConcepts extends React.Component {

    constructor(props) {
        super(props);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.state = {
            selectedDay: undefined,
        };
    }

    handleDayClick(day) {
        this.setState({ selectedDay: day });
    }

    render() {
        return (
            <div>
                <DayPicker className="daypick" onDayClick={this.handleDayClick} />
                {this.state.selectedDay ? (
                    <p className="dateis">{this.state.selectedDay.toLocaleDateString()}</p>
                ) : (
                        <p>Please select a day.</p>
                    )}
            </div>
        );
    }
}