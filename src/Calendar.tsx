import React from 'react';
import {Day, decadeNames, frJDN, Month} from './dates';

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
    return <th className="DecadeName">{name}</th>;
}

function DayDetail({jdn}: { jdn: number }): JSX.Element {
    return <div className="DayDetail">
        <div className="DayDetail-gregorian">{}</div>
    </div>;
}

function NormalDay({year, month, day, isToday}: DateProps & { isToday: boolean }): JSX.Element {
    return <td className={`Day NormalDay ${isToday ? 'Day-today' : ''}`}>
        <div className="Day-name">{day}</div>
        <DayDetail jdn={frJDN(year, month, day)}/>
    </td>;
}

function NormalMonth({year, month}: MonthProps): JSX.Element {
    const decadeHeads = decadeNames.map(name => <DecadeName name={name}/>);
    return <table>
        <thead>
        <tr className="Month-decadeHead">{decadeHeads}</tr>
        </thead>
        <tbody>{
            Array.from(Array(3).keys()).map(i => <tr className="Month-decade">{
                Array.from(Array(10).keys()).map(j =>
                    <NormalDay year={year} month={month} day={i * 10 + j + 1 as Day} isToday={false}/>)
            }</tr>)
        }</tbody>
    </table>;
}

export class Calendar extends React.Component<CalendarProps, CalendarState> {
    render(): JSX.Element {
        return <NormalMonth year={this.props.year} month={this.props.month}/>;
    }
}
