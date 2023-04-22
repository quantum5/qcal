import React from 'react';
import './Calendar.scss';
import {formatJG, jdnGregorian, JulianDay, JulianMonth, monthName, weekdayNames} from '@common/gregorian';
import {jdnLongCount} from '@common/longCount';
import {jdnJulian, julianJDN, julianMonthDays} from '@common/julian';
import {frDateFormat, frEndJD, frStartJD, jdnFrench} from '@common/french';

type MonthProps = {
    year: number;
    month: JulianMonth;
};

type DateProps = MonthProps & {
    day: JulianDay;
};

function WeekdayName({name}: { name: string }): JSX.Element {
    return <div className="WeekdayName">{name}</div>;
}

function DayDetail({jdn}: { jdn: number }): JSX.Element {
    const lc = jdnLongCount(jdn);
    return <div className="DayDetail">
        <div className="DayDetail-jdn"><abbr title="Julian day number">JD</abbr> {jdn}</div>
        <div className="DayDetail-gregorian">
            <abbr title="Gregorian date">G.</abbr>{' '}
            {formatJG(jdnGregorian(jdn))}
        </div>
        {lc && <div className="DayDetail-lc">
          <abbr title="Mesoamerican long count date">LC</abbr>{' '}
            {lc.join('.\u200b')}
        </div>}
        {jdn >= frStartJD && jdn <= frEndJD && <div className="DayDetail-fr">
          <abbr title="French Republican Calendar">FR</abbr>{' '}
            {frDateFormat(jdnFrench(jdn))}
        </div>}
    </div>;
}

function Day({year, month, day, todayJDN}: DateProps & { todayJDN: number }): JSX.Element {
    const jdn = julianJDN(year, month, day);
    return <div className={`Day NormalDay ${jdn === todayJDN ? 'Day-today' : ''}`}>
        <div className="Day-name">{day}</div>
        <div className="Day-weekday">{weekdayNames[(day - 1) % 7]}</div>
        <DayDetail jdn={jdn}/>
    </div>;
}

function Month({year, month, todayJDN}: MonthProps & { todayJDN: number }): JSX.Element {
    const decadeHeads = weekdayNames.map((name, i) => <WeekdayName key={i} name={name}/>);
    const firstJDN = julianJDN(year, month, 1);
    const firstWeekday = (firstJDN + 1) % 7;
    const daysTotal = julianMonthDays(year, month);
    return <div className="Month">
        <div className="Month-weekdayHead">{decadeHeads}</div>
        <div className="Month-days">{
            Array.from(Array(6).keys()).flatMap(i => {
                if (i * 7 - firstWeekday + 1 > daysTotal)
                    return [];
                return Array.from(Array(7).keys()).map(j => {
                    const day = i * 7 + j - firstWeekday + 1 as JulianDay;
                    if (day < 1 || day > daysTotal)
                        return <div key={j} className="DayFiller"/>;
                    return <div key={j} className="DayOuter">
                        <Day year={year} month={month} day={day} todayJDN={todayJDN}/>
                    </div>;
                });
            })
        }</div>
    </div>;
}

export type CalendarProps = MonthProps & {
    todayJDN: number;
    onSwitch?: (year: number, month: JulianMonth) => void,
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
            month += 12;
        }

        if (month > 12) {
            ++year;
            month -= 12;
        }

        this.props.onSwitch && this.props.onSwitch(year, month as JulianMonth);
    }

    prevYear = () => {
        this.goToNormalized(this.props.year - 1, this.props.month);
    };

    prevMonth = () => {
        this.goToNormalized(this.props.year, this.props.month - 1);
    };

    nextYear = () => {
        this.goToNormalized(this.props.year + 1, this.props.month);
    };

    nextMonth = () => {
        this.goToNormalized(this.props.year, this.props.month + 1);
    };

    startSelection = () => {
        this.setState({selecting: true});
    };

    handleClickOutside = (event: any) => {
        if (this.state.selecting && this.selection.current && !this.selection.current.contains(event.target))
            this.setState({selecting: false});
    };

    handleKeyUp = (event: any) => {
        if (event.key === 'Escape')
            this.setState({selecting: false});
    };

    monthChange = (event: any) => {
        this.goToNormalized(this.props.year, +event.target.value as JulianMonth);
    };

    yearChange = (event: any) => {
        if (/^-?\d+/.test(event.target.value)) {
            this.goToNormalized(+event.target.value, this.props.month);
        }
        this.setState({yearStr: event.target.value});
    };

    goToToday = () => {
        const [year, month] = jdnJulian(this.props.todayJDN);
        this.goToNormalized(year, month);
        this.setState({selecting: false});
    };

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
                    {monthName(this.props.month)} {this.props.year}
                </div>}
                {this.state.selecting && <div className="Calendar-month-name input-group" ref={this.selection}
                                              onKeyUp={this.handleKeyUp}>
                  <select className="Calendar-month-input form-control" onChange={this.monthChange}
                          value={this.props.month}>{
                      Array.from(Array(12).keys()).map(i => {
                          const month = i + 1 as JulianMonth;
                          return <option key={i} value={month}>{monthName(month)}</option>;
                      })
                  }</select>
                  <input type="number" className="Calendar-year-input form-control" value={this.state.yearStr}
                         onChange={this.yearChange}/>
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
            <Month year={this.props.year} month={this.props.month} todayJDN={this.props.todayJDN}/>
        </div>;
    }
}
