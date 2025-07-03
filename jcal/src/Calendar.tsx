import React from 'react';
import './Calendar.scss';
import {formatJG, jdnGregorian, JulianDay, JulianMonth, monthName, jdnWeekDay, weekdayNames} from '@common/gregorian';
import {jdnLongCount} from '@common/longCount';
import {jdnJulian, julianJDN, julianMonthDays} from '@common/julian';
import {frDateFormat, frEndJD, frStartJD, jdnFrench} from '@common/french';
import {useMobileTooltipProps} from '@common/ui/MobileTooltip';
import {MonthBasedCalendar} from '@common/ui/MonthBasedCalendar';

type JulianYear = number;

type MonthProps = {
    year: JulianYear;
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
    const mobile = useMobileTooltipProps();
    return <div className="DayDetail">
        <div className="DayDetail-jdn"><abbr title="Julian day number" {...mobile}>JD</abbr> {jdn}</div>
        <div className="DayDetail-gregorian">
            <abbr title="Gregorian date" {...mobile}>G.</abbr>{' '}
            {formatJG(jdnGregorian(jdn))}
        </div>
        {lc && <div className="DayDetail-lc">
          <abbr title="Mesoamerican long count date" {...mobile}>LC</abbr>{' '}
            {lc.join('.\u200b')}
        </div>}
        {jdn >= frStartJD && jdn <= frEndJD && <div className="DayDetail-fr">
          <abbr title="French Republican Calendar" {...mobile}>FR</abbr>{' '}
            {frDateFormat(jdnFrench(jdn))}
        </div>}
    </div>;
}

function Day({year, month, day, todayJDN}: DateProps & { todayJDN: number }): JSX.Element {
    const jdn = julianJDN(year, month, day);
    return <div className={`Day NormalDay ${jdn === todayJDN ? 'Day-today' : ''}`}>
        <div className="Day-name">{day}</div>
        <div className="Day-weekday">{weekdayNames[jdnWeekDay(jdn)]}</div>
        <DayDetail jdn={jdn}/>
    </div>;
}

function Month({year, month, todayJDN}: MonthProps & { todayJDN: number }): JSX.Element {
    const decadeHeads = weekdayNames.map((name, i) => <WeekdayName key={i} name={name}/>);
    const firstJDN = julianJDN(year, month, 1);
    const firstWeekday = jdnWeekDay(firstJDN);
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

export class Calendar extends MonthBasedCalendar<JulianYear, JulianMonth> {
    override parseYear(year: string): JulianYear {
        return +year;
    }

    override parseMonth(month: string): JulianMonth {
        return +month as JulianMonth;
    }

    override yearToString(year: JulianYear): string {
        return year.toString();
    }

    override monthToString(month: JulianMonth): string {
        return month.toString();
    }

    private goToNormalized(year: number, month: number) {
        while (month < 1) {
            --year;
            month += 12;
        }

        while (month > 12) {
            ++year;
            month -= 12;
        }

        this.goTo(year, month as JulianMonth);
    }

    override prevYear = () => {
        this.goToNormalized(this.props.year - 1, this.props.month);
    };

    override prevMonth = () => {
        this.goToNormalized(this.props.year, this.props.month - 1);
    };

    override nextYear = () => {
        this.goToNormalized(this.props.year + 1, this.props.month);
    };

    override nextMonth = () => {
        this.goToNormalized(this.props.year, this.props.month + 1);
    };

    override isValidYear(year: string): boolean {
        return /^-?\d+/.test(year);
    }

    override jdnLookup(jdn: number): { year: JulianYear; month: JulianMonth } {
        const [year, month] = jdnJulian(jdn);
        return {year, month};
    }

    override monthName(year: JulianYear, month: JulianMonth): string {
        return `${monthName(month)} ${year}`;
    }

    override renderMonthOptions(): JSX.Element[] {
        return Array.from(Array(12).keys()).map(i => {
            const month = i + 1 as JulianMonth;
            return <option key={i} value={month}>{monthName(month)}</option>;
        });
    }

    override renderBody(): JSX.Element {
        return <Month year={this.props.year} month={this.props.month} todayJDN={this.props.todayJDN}/>
    }
}
