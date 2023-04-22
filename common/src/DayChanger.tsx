import React from 'react';
import {dateJDN} from './gregorian';

function dayMs(date: Date): number {
    return date.getHours() * 3_600_000 + date.getMinutes() * 60_000 + date.getSeconds() * 1000 + date.getMilliseconds();
}

type DayChangerProps = {
    onDateChange: (jdn: number) => void,
};

export function DayChanger({onDateChange}: DayChangerProps): null {
    const [jdn, setJDN] = React.useState(dateJDN(new Date()));

    React.useEffect(() => {
        const now = new Date();
        const timer = setTimeout(() => {
            const jdn = dateJDN(new Date());
            setJDN(jdn);
            onDateChange(jdn);
        }, 86_400_000 - dayMs(now));
        return () => clearTimeout(timer);
    }, [jdn, onDateChange]);

    return null;
}
