import React from 'react';
import dayjs from "dayjs";
import {MobileDatePicker} from "@mui/x-date-pickers";

const CalendarComponent = () => {
    const today = new Date();
    const todayDate = dayjs();

    const hours = today.getHours().toString().padStart(2, '0');
    const minutes = today.getMinutes().toString().padStart(2, '0');

    const todayValue = {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate(),
    };

    return (
        <div>
            <MobileDatePicker
                label={'Date'}
                minDate={todayDate}
                className="change-date-time-modal__date-picker"
                defaultValue={dayjs(`${todayValue.year}-${todayValue.month}-${todayValue.day}`)}
            />
        </div>
    );
};

export default CalendarComponent;