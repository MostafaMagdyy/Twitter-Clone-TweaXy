import React from 'react';
import { MenuItem, TextField } from '@mui/material';
import SignUpSelectors from '../../shared/selectors/SignUp';
const months = [
    { name: 'January', value: '1' },
    { name: 'February', value: '2' },
    { name: 'March', value: '3' },
    { name: 'April', value: '4' },
    { name: 'May', value: '5' },
    { name: 'June', value: '6' },
    { name: 'July', value: '7' },
    { name: 'August', value: '8' },
    { name: 'September', value: '9' },
    { name: 'October', value: '10' },
    { name: 'November', value: '11' },
    { name: 'December', value: '12' },
];
const BirthDate = ({ Data2, Data2_Handler }) => {
    const years = Array.from({ length: 121 }, (_, i) => 2023 - i);
    const Render_Days = () => {
        const days = Array.from({ length: 31 }, (_, i) => i + 1);
        if (
            Data2.month === '4' ||
            Data2.month === '6' ||
            Data2.month === '9' ||
            Data2.month === '11'
        ) {
            return days.filter((day) => day !== 31);
        } else if (Data2.month === '2') {
            const isLeapYear =
                (Data2.year % 4 === 0 && Data2.year % 100 !== 0) ||
                Data2.year % 400 === 0;
            return isLeapYear ? days.slice(0, 29) : days.slice(0, 28);
        }
        return days;
    };
    return (
        <div className="sign-up-birth-date">
            <TextField
                aria-label="Month"
                inputProps={{ 'data-testid': 'month-testid' }}
                className="sign-up-birth-date-selection"
                id="outlined-select-currency"
                select
                label="Month"
                defaultValue="Select Month"
                name="month"
                data-testid="month-select"
                value={Data2.month}
                onChange={Data2_Handler}
                sw={{
                    width: '300px',
                }}
            >
                {months.map((month) => (
                    <MenuItem
                        key={month.value}
                        value={month.value}
                        data-test={`${month.value}_${SignUpSelectors.MONTH_FIELD}`}
                    >
                        {month.name}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                aria-label="Day"
                inputProps={{ 'data-testid': 'day-testid' }}
                className="sign-up-birth-date-selection"
                id="outlined-select-currency"
                select
                label="Day"
                defaultValue="Select Day"
                name="day"
                data-test={SignUpSelectors.DAY_FIELD}
                value={Data2.day}
                onChange={Data2_Handler}
                sw={{
                    width: '300px',
                }}
            >
                {Render_Days(Data2.month).map((day) => (
                    <MenuItem
                        key={day}
                        value={day}
                        data-test={`${day}_${SignUpSelectors.DAY_FIELD}`}
                    >
                        {day}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                aria-label="Year"
                inputProps={{ 'data-testid': 'year-testid' }}
                className="sign-up-birth-date-selection"
                id="outlined-select-currency"
                select
                label="Year"
                name="year"
                defaultValue="Select Year"
                data-test={SignUpSelectors.YEAR_FIELD}
                value={Data2.year}
                onChange={Data2_Handler}
                sw={{
                    width: '300px',
                }}
            >
                {years.map((year) => (
                    <MenuItem
                        key={year}
                        value={year}
                        data-test={`${year}_${SignUpSelectors.YEAR_FIELD}`}
                    >
                        {year}
                    </MenuItem>
                ))}
            </TextField>
        </div>
    );
};

export { BirthDate as default, months };
