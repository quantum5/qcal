import React from 'react';
import {Day, decadeNames, frJDN, jdnGregorian, jdnLongCount, Month} from './dates';

type MonthProps = {
    year: number;
    month: Month;
};

type DateProps = MonthProps & {
    day: Day;
};

export type CalendarProps = DateProps & {
    year: number;
    month: Month;
    onSwitch?: (year: number, month: Month, day: Day) => void,
};

type CalendarState = {};

function DecadeName({name}: { name: string }): JSX.Element {
    return <div className="DecadeName">{name}</div>;
}

function DayDetail({jdn}: { jdn: number }): JSX.Element {
    return <div className="DayDetail">
        <div className="DayDetail-gregorian">{jdnGregorian(jdn).toDateString()}</div>
        <div className="DayDetail-lc">{jdnLongCount(jdn)}</div>
    </div>;
}

function NormalDay({year, month, day, isToday}: DateProps & { isToday: boolean }): JSX.Element {
    return <div className={`Day NormalDay ${isToday ? 'Day-today' : ''}`}>
        <div className="Day-name">{day}</div>
        <div className="Day-decade">{decadeNames[(day - 1) % 10]}</div>
        <DayDetail jdn={frJDN(year, month, day)}/>
    </div>;
}

function NormalMonth({year, month}: MonthProps): JSX.Element {
    const decadeHeads = decadeNames.map(name => <DecadeName name={name}/>);
    return <div className="Month">
        <div className="Month-decadeHead">{decadeHeads}</div>
        <div className="Month-decades">{
            Array.from(Array(3).keys()).map(i => <div className="Month-decade">{
                Array.from(Array(10).keys()).map(j =>
                    <NormalDay year={year} month={month} day={i * 10 + j + 1 as Day} isToday={false}/>)
            }</div>)
        }</div>
    </div>;
}

export class Calendar extends React.Component<CalendarProps, CalendarState> {
    render(): JSX.Element {
        return <NormalMonth year={this.props.year} month={this.props.month}/>;
    }
}
