import React from 'react';
import './Calendar.scss';
import {dateName, Day, decadeNames, frIsLeap, frJDN, jdnGregorian, jdnLongCount, Month, monthName} from './dates';

type MonthProps = {
    year: number;
    month: Month;
};

type DateProps = MonthProps & {
    day: Day;
};

export type CalendarProps = MonthProps & {
    todayJDN: number;
    onSwitch?: (year: number, month: Month) => void,
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

function NormalDay({year, month, day, todayJDN}: DateProps & { todayJDN: number }): JSX.Element {
    const jdn = frJDN(year, month, day);
    return <div className={`Day NormalDay ${jdn === todayJDN ? 'Day-today' : ''}`}>
        <div className="Day-name">{day}</div>
        <div className="Day-decade">{decadeNames[(day - 1) % 10]}</div>
        <DayDetail jdn={jdn}/>
    </div>;
}

function NormalMonth({year, month, todayJDN}: MonthProps & { todayJDN: number }): JSX.Element {
    const decadeHeads = decadeNames.map(name => <DecadeName name={name}/>);
    return <div className="Month">
        <div className="Month-decadeHead">{decadeHeads}</div>
        <div className="Month-decades">{
            Array.from(Array(3).keys()).map(i => <div className="Month-decade">{
                Array.from(Array(10).keys()).map(j => <>
                    <NormalDay year={year} month={month} day={i * 10 + j + 1 as Day} todayJDN={todayJDN}/>
                    {j === 4 && <div className="Month-decadeSplitter"/>}
                </>)
            }</div>)
        }</div>
    </div>;
}

function ComplementaryDay({year, month, day, todayJDN}: DateProps & { todayJDN: number }): JSX.Element {
    const jdn = frJDN(year, month, day);
    return <div className={`Day ComplementaryDay ${jdn === todayJDN ? 'Day-today' : ''}`}>
        <div className="Day-name">{dateName(month, day)}</div>
        <DayDetail jdn={jdn}/>
    </div>;
}

function ComplementaryDays({year, todayJDN}: {year: number, todayJDN: number}): JSX.Element {
    return <div className="ComplementaryDays">{
        Array.from(Array(frIsLeap(year) ? 6 : 5).keys()).map(i => <>
            <ComplementaryDay year={year} month={13} day={i + 1 as Day} todayJDN={todayJDN}/>
            {i % 2 === 1 && <div className="ComplementaryDays-splitter"/>}
        </>)
    }</div>;
}

export class Calendar extends React.Component<CalendarProps, CalendarState> {
    private goToNormalized(year: number, month: number) {
        if (month < 1) {
            --year;
            month += 13;
        }

        if (month > 13) {
            ++year;
            month -= 13;
        }

        this.props.onSwitch && this.props.onSwitch(year, month as Month);
    }

    prevYear() {
        this.goToNormalized(this.props.year - 1, this.props.month);
    }

    prevMonth() {
        this.goToNormalized(this.props.year, this.props.month - 1);
    }

    nextYear() {
        this.goToNormalized(this.props.year + 1, this.props.month);
    }

    nextMonth() {
        this.goToNormalized(this.props.year, this.props.month + 1);
    }

    render(): JSX.Element {
        return <div className="Calendar">
            <div className="Calendar-head">
                <div className="Calendar-prev">
                    <button type="button" className="btn btn-secondary" title="Previous year"
                            onClick={this.prevYear.bind(this)}>«
                    </button>
                    <button type="button" className="btn btn-secondary" title="Previous month"
                            onClick={this.prevMonth.bind(this)}>‹
                    </button>
                </div>
                <div className="Calendar-month-name">
                    {this.props.month < 13 && monthName(this.props.month)} {this.props.year}
                </div>
                <div className="Calendar-next">
                    <button type="button" className="btn btn-secondary" title="Next month"
                            onClick={this.nextMonth.bind(this)}>›
                    </button>
                    <button type="button" className="btn btn-secondary" title="Next year"
                            onClick={this.nextYear.bind(this)}>»
                    </button>
                </div>
            </div>
            {this.props.month < 13 && <NormalMonth year={this.props.year} month={this.props.month} todayJDN={this.props.todayJDN}/>}
            {this.props.month === 13 && <ComplementaryDays year={this.props.year} todayJDN={this.props.todayJDN}/>}
        </div>;
    }
}
