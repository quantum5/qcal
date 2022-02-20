import React from 'react';
import './Calendar.scss';
import {
    dateName,
    dateRuralName,
    Day,
    decadeNames,
    endYear,
    frIsLeap,
    frJDN,
    jdnFrench,
    jdnGregorian,
    jdnLongCount,
    Month,
    monthName,
    startYear
} from './dates';

type MonthProps = {
    year: number;
    month: Month;
};

type DateProps = MonthProps & {
    day: Day;
};

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
    const rural = dateRuralName(month, day)!;
    return <div className={`Day NormalDay ${jdn === todayJDN ? 'Day-today' : ''}`}>
        <div className="Day-name">{day}</div>
        <div className="Day-decade">{decadeNames[(day - 1) % 10]}</div>
        <div className="Day-rural" title={rural.title} tabIndex={0}>{rural.name}</div>
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
                    {j % 2 === 1 && <div className="Month-decadeSplitter-small"/>}
                    {j === 4 && <div className="Month-decadeSplitter-medium"/>}
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

function ComplementaryDays({year, todayJDN}: { year: number, todayJDN: number }): JSX.Element {
    const leap = frIsLeap(year);
    return <div className="ComplementaryDays">{
        Array.from(Array(6).keys()).map(i => <>
            {(i < 5 || leap) && <ComplementaryDay year={year} month={13} day={i + 1 as Day} todayJDN={todayJDN}/>}
            {i === 5 && !leap && <div className="ComplementaryDay-fake"/>}
            {i % 2 === 1 && <div className="ComplementaryDays-splitter"/>}
        </>)
    }</div>;
}

export type CalendarProps = MonthProps & {
    todayJDN: number;
    onSwitch?: (year: number, month: Month) => void,
};

type CalendarState = {
    selecting: boolean,
    yearStr: string,
};

export class Calendar extends React.Component<CalendarProps, CalendarState> {
    selection: React.RefObject<HTMLDivElement>;

    constructor(props: CalendarProps) {
        super(props);
        this.state = {
            selecting: false,
            yearStr: this.props.year.toString(),
        };
        this.selection = React.createRef();
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside, true);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, true);
    }

    private goToNormalized(year: number, month: number) {
        if (month < 1) {
            --year;
            month += 13;
        }

        if (month > 13) {
            ++year;
            month -= 13;
        }

        if (year < startYear) {
            year = startYear;
            month = 1;
        } else if (year > endYear) {
            year = endYear;
            month = 13;
        }

        this.props.onSwitch && this.props.onSwitch(year, month as Month);
    }

    prevYear = () => {
        this.goToNormalized(this.props.year - 1, this.props.month);
    }

    prevMonth = () => {
        this.goToNormalized(this.props.year, this.props.month - 1);
    }

    nextYear = () => {
        this.goToNormalized(this.props.year + 1, this.props.month);
    }

    nextMonth = () => {
        this.goToNormalized(this.props.year, this.props.month + 1);
    }

    startSelection = () => {
        this.setState({selecting: true});
    }

    handleClickOutside = (event: any) => {
        if (this.state.selecting && this.selection.current && !this.selection.current.contains(event.target))
            this.setState({selecting: false});
    }

    handleKeyUp = (event: any) => {
        if (event.key === 'Escape')
            this.setState({selecting: false});
    }

    monthChange = (event: any) => {
        this.goToNormalized(this.props.year, +event.target.value as Month);
    }

    yearChange = (event: any) => {
        if (/^-?\d+/.test(event.target.value)) {
            this.goToNormalized(+event.target.value, this.props.month);
        }
        this.setState({yearStr: event.target.value});
    }

    goToToday = () => {
        const {year, month} = jdnFrench(this.props.todayJDN);
        this.goToNormalized(year, month);
        this.setState({selecting: false});
    }

    componentDidUpdate(prevProps: CalendarProps) {
        if (prevProps.year !== this.props.year) {
            const yearStr = this.props.year.toString();
            if (this.state.yearStr !== yearStr) {
                this.setState({
                    yearStr: yearStr,
                });
            }
        }
    }

    render(): JSX.Element {
        return <div className="Calendar">
            <div className="Calendar-head">
                <div className="Calendar-prev">
                    <button type="button" className="btn btn-secondary" title="Previous year" onClick={this.prevYear}>«
                    </button>
                    <button type="button" className="btn btn-secondary" title="Previous month"
                            onClick={this.prevMonth}>‹
                    </button>
                </div>
                {!this.state.selecting && <div className="Calendar-month-name" onClick={this.startSelection}>
                    {this.props.month < 13 && monthName(this.props.month)} {this.props.year}
                </div>}
                {this.state.selecting && <div className="Calendar-month-name input-group" ref={this.selection}
                                              onKeyUp={this.handleKeyUp}>
                  <select className="Calendar-month-input form-control" onChange={this.monthChange}
                          value={this.props.month}>{
                      Array.from(Array(13).keys()).map(i => {
                          const month = i + 1 as Month;
                          return <option value={month}>{monthName(month)}</option>;
                      })
                  }</select>
                  <input type="number" className="Calendar-year-input form-control" value={this.state.yearStr}
                         onChange={this.yearChange} min={startYear} max={endYear}/>
                  <button type="button" className="form-control btn btn-primary Calendar-today-button"
                          onClick={this.goToToday}>Today
                  </button>
                </div>}
                <div className="Calendar-next">
                    <button type="button" className="btn btn-secondary" title="Next month" onClick={this.nextMonth}>›
                    </button>
                    <button type="button" className="btn btn-secondary" title="Next year" onClick={this.nextYear}>»
                    </button>
                </div>
            </div>
            {this.props.month < 13 &&
              <NormalMonth year={this.props.year} month={this.props.month} todayJDN={this.props.todayJDN}/>}
            {this.props.month === 13 && <ComplementaryDays year={this.props.year} todayJDN={this.props.todayJDN}/>}
        </div>;
    }
}
