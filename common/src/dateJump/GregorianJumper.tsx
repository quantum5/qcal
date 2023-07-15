import {DateJumperProps} from './base';
import React from 'react';
import {gregorianJDN, jdnGregorian} from '../gregorian';

export default function GregorianJumper({minJDN, maxJDN, todayJDN, onJump}: DateJumperProps): JSX.Element {
    const {todayYear, todayMonth, todayDay, startYear, endYear} = React.useMemo(() => {
        const [todayYear, todayMonth, todayDay] = jdnGregorian(todayJDN);
        const [startYear] = jdnGregorian(minJDN);
        const [endYear] = jdnGregorian(maxJDN);
        return {todayYear, todayMonth, todayDay, startYear, endYear};
    }, [minJDN, maxJDN, todayJDN]);

    const [year, setYear] = React.useState(todayYear.toString());
    const [month, setMonth] = React.useState(todayMonth.toString());
    const [day, setDay] = React.useState(todayDay.toString());

    const validYear = /^-?\d+$/.test(year) && startYear <= +year && +year <= endYear;
    const validMonth = /^\d+$/.test(month) && 1 <= +month && +month <= 12;
    const validDay = /^\d+$/.test(day) && 1 <= +day && +day <= 31;

    function goToGregorian(event: React.FormEvent) {
        event.preventDefault();

        if (!validYear || !validMonth || !validDay)
            return;

        onJump(gregorianJDN(+year, +month, +day));
    }

    return <form className="input-group" onSubmit={goToGregorian}>
        <span className="input-group-text">Gregorian<span className="hide-small">&nbsp;Date</span></span>
        <input type="number" className={`form-control go-year ${validYear ? '' : 'is-invalid'}`}
               onChange={e => setYear(e.target.value)} value={year}
               min={startYear} max={endYear}/>
        <input type="number" className={`form-control go-month ${validMonth ? '' : 'is-invalid'}`}
               onChange={e => setMonth(e.target.value)} value={month}
               min={1} max={12}/>
        <input type="number" className={`form-control go-day ${validDay ? '' : 'is-invalid'}`}
               onChange={e => setDay(e.target.value)} value={day}
               min={1} max={31}/>
        <button type="submit" className="form-control btn btn-primary go-button">Go</button>
    </form>;
}
