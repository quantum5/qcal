import React from 'react';
import './Calendar.scss';
import {formatJG, jdnGregorian} from '@common/gregorian';
import {jdnLongCount} from '@common/longCount';
import {MonthBasedCalendar} from '@common/ui/MonthBasedCalendar';
import {
    formatLordOfNight,
    formatTzolkin,
    HaabDay,
    haabExtJDN,
    HaabMonth,
    haabMonthDays,
    haabNames,
    HaabYear,
    jdnHaabExt,
    jdnLordOfNight,
    jdnTzolkin,
} from '@common/mayan';
import {useMobileTooltipProps} from '@common/ui/MobileTooltip';

type MonthProps = {
    year: HaabYear;
    month: HaabMonth;
};

type DateProps = MonthProps & {
    day: HaabDay;
};

function Day({year, month, day, todayJDN}: DateProps & { todayJDN: number }): JSX.Element {
    const jdn = haabExtJDN({year, month, day});
    const mobile = useMobileTooltipProps();
    return <div className={`Day ${jdn === todayJDN ? 'Day-today' : ''}`}>
        <div className="Day-name">{day}<span className="Day-haabMonth"> {haabNames[month]}</span></div>
        <div className="Day-tzolkin">
            <abbr title="Tzolkʼin" {...mobile}>T.</abbr> {formatTzolkin(jdnTzolkin(jdn))}
        </div>
        <div className="Day-lc">
            <abbr title="Long count" {...mobile}>L.</abbr> {jdnLongCount(jdn)?.join('.')}
        </div>
        <div className="Day-lordOfNight">
            <abbr title="Lord of the Night" {...mobile}>N.</abbr> {formatLordOfNight(jdnLordOfNight(jdn))
        }</div>
        <div className="Day-gregorian">
            <abbr title="Gregorian date" {...mobile}>G.</abbr> {formatJG(jdnGregorian(jdn))}
        </div>
    </div>;
}

function Month({year, month, todayJDN}: MonthProps & { todayJDN: number }): JSX.Element {
    return <div className="Month">
        <div className="Month-days">{
            Array.from(Array(haabMonthDays(month)).keys()).map(i => <div key={i} className="DayOuter">
                <Day year={year} month={month} day={i + 1 as HaabDay} todayJDN={todayJDN}/>
            </div>)
        }</div>
    </div>;
}

export class Calendar extends MonthBasedCalendar<HaabYear, HaabMonth> {
    override parseYear(year: string): HaabYear {
        return +year;
    }

    override parseMonth(month: string): HaabMonth {
        return +month as HaabMonth;
    }

    override yearToString(year: HaabYear): string {
        return year.toString();
    }

    override monthToString(month: HaabMonth): string {
        return month.toString();
    }

    private goToNormalized(year: number, month: number) {
        while (month < 1) {
            --year;
            month += 19;
        }

        while (month > 19) {
            ++year;
            month -= 19;
        }

        this.goTo(year, month as HaabMonth);
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

    override jdnLookup(jdn: number): { year: HaabYear; month: HaabMonth } {
        return jdnHaabExt(jdn);
    }

    override monthName(year: HaabYear, month: HaabMonth): string {
        return `${haabNames[month]} ${year}`;
    }

    override renderMonthOptions(): JSX.Element[] {
        return Array.from(Array(19).keys()).map(i => {
            const month = i + 1 as HaabMonth;
            return <option key={i} value={month}>{haabNames[month]}</option>;
        });
    }

    override renderBody(): JSX.Element {
        return <Month year={this.props.year} month={this.props.month} todayJDN={this.props.todayJDN}/>;
    }
}
