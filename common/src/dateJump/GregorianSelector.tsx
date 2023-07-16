import {DateSelectorProps} from './base';
import React from 'react';
import {gregorianJDN, jdnGregorian} from '../gregorian';

function GregorianSelector({minJDN, maxJDN, initialJDN, onChange}: DateSelectorProps): JSX.Element {
    const {todayYear, todayMonth, todayDay, startYear, endYear} = React.useMemo(() => {
        const [todayYear, todayMonth, todayDay] = jdnGregorian(initialJDN);
        const [startYear] = jdnGregorian(minJDN);
        const [endYear] = jdnGregorian(maxJDN);
        return {todayYear, todayMonth, todayDay, startYear, endYear};
    }, [minJDN, maxJDN, initialJDN]);

    const [year, setYear] = React.useState(todayYear.toString());
    const [month, setMonth] = React.useState(todayMonth.toString());
    const [day, setDay] = React.useState(todayDay.toString());

    const validYear = /^-?\d+$/.test(year) && startYear <= +year && +year <= endYear;
    const validMonth = /^\d+$/.test(month) && 1 <= +month && +month <= 12;
    const validDay = /^\d+$/.test(day) && 1 <= +day && +day <= 31;
    const valid = validYear && validMonth && validDay;

    React.useEffect(
        () => onChange(valid ? gregorianJDN(+year, +month, +day) : undefined),
        [onChange, year, month, day, valid],
    );

    return <>
        <input type="number" className={`form-control year${validYear ? '' : ' is-invalid'}`}
               onChange={e => setYear(e.target.value)} value={year}
               min={startYear} max={endYear}/>
        <input type="number" className={`form-control month${validMonth ? '' : ' is-invalid'}`}
               onChange={e => setMonth(e.target.value)} value={month}
               min={1} max={12}/>
        <input type="number" className={`form-control day${validDay ? '' : ' is-invalid'}`}
               onChange={e => setDay(e.target.value)} value={day}
               min={1} max={31}/>
    </>;
}

export default GregorianSelector;
