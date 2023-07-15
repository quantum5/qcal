import React from 'react';
import './Calendar.scss';
import {
    dateName,
    dateRuralName,
    decadeNames,
    FrenchDay,
    FrenchMonth,
    frEndYear,
    frIsLeap,
    frJDN,
    frStartYear,
    jdnFrench,
    monthName,
} from '@common/french';
import {jdnDate} from '@common/gregorian';
import {jdnLongCount} from '@common/longCount';
import {useMobileTooltipProps} from '@common/MobileTooltip';
import {MonthBasedCalendar} from '@common/MonthBasedCalendar';

type FrenchYear = number;

type MonthProps = {
    year: FrenchYear;
    month: FrenchMonth;
};

type DateProps = MonthProps & {
    day: FrenchDay;
};

function DecadeName({name}: { name: string }): JSX.Element {
    return <div className="DecadeName">{name}</div>;
}

function DayDetail({jdn}: { jdn: number }): JSX.Element {
    return <div className="DayDetail">
        <div className="DayDetail-gregorian">{jdnDate(jdn).toDateString()}</div>
        <div className="DayDetail-lc">{jdnLongCount(jdn)?.join('.')}</div>
    </div>;
}

function NormalDay({year, month, day, todayJDN}: DateProps & { todayJDN: number }): JSX.Element {
    const jdn = frJDN(year, month, day);
    const rural = dateRuralName(month, day)!;
    const mobile = useMobileTooltipProps();
    return <div className={`Day NormalDay ${jdn === todayJDN ? 'Day-today' : ''}`}>
        <div className="Day-name">{day}</div>
        <div className="Day-decade">{decadeNames[(day - 1) % 10]}</div>
        <div className="Day-rural"><abbr title={rural.title} {...mobile}>{rural.name}</abbr></div>
        <DayDetail jdn={jdn}/>
    </div>;
}

function NormalMonth({year, month, todayJDN}: MonthProps & { todayJDN: number }): JSX.Element {
    const decadeHeads = decadeNames.map((name, i) => <DecadeName key={i} name={name}/>);
    return <div className="Month">
        <div className="Month-decadeHead">{decadeHeads}</div>
        <div className="Month-decades">{
            Array.from(Array(3).keys()).map(i => <div key={i} className="Month-decade">{
                Array.from(Array(10).keys()).map(j => <React.Fragment key={j}>
                    <NormalDay year={year} month={month} day={i * 10 + j + 1 as FrenchDay} todayJDN={todayJDN}/>
                    {j % 2 === 1 && <div className="Month-decadeSplitter-small"/>}
                    {j === 4 && <div className="Month-decadeSplitter-medium"/>}
                </React.Fragment>)
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

function ComplementaryDays({year, todayJDN}: { year: FrenchYear, todayJDN: number }): JSX.Element {
    const leap = frIsLeap(year);
    return <div className="ComplementaryDays">{
        Array.from(Array(6).keys()).map(i => <React.Fragment key={i}>
            {(i < 5 || leap) && <ComplementaryDay year={year} month={13} day={i + 1 as FrenchDay} todayJDN={todayJDN}/>}
            {i === 5 && !leap && <div className="ComplementaryDay-fake"/>}
            {i % 2 === 1 && <div className="ComplementaryDays-splitter"/>}
        </React.Fragment>)
    }</div>;
}

export class Calendar extends MonthBasedCalendar<FrenchYear, FrenchMonth> {
    override parseYear(year: string): FrenchYear {
        return +year;
    }

    override parseMonth(month: string): FrenchMonth {
        return +month as FrenchMonth;
    }

    override yearToString(year: FrenchYear): string {
        return year.toString();
    }

    override monthToString(month: FrenchMonth): string {
        return month.toString();
    }

    private goToNormalized(year: number, month: number) {
        while (month < 1) {
            --year;
            month += 13;
        }

        while (month > 13) {
            ++year;
            month -= 13;
        }

        if (year < frStartYear) {
            year = frStartYear;
            month = 1;
        } else if (year > frEndYear) {
            year = frEndYear;
            month = 13;
        }

        this.goTo(year, month as FrenchMonth);
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

    override jdnLookup(jdn: number): { year: FrenchYear; month: FrenchMonth } {
        return jdnFrench(jdn);
    }

    override monthName(year: FrenchYear, month: FrenchMonth): string {
        return month === 13 ? year.toString() : `${monthName(month)} ${year}`;
    }

    override renderMonthOptions(): JSX.Element[] {
        return Array.from(Array(13).keys()).map(i => {
            const month = i + 1 as FrenchMonth;
            return <option key={i} value={month}>{monthName(month)}</option>;
        });
    }

    override renderBody(): JSX.Element {
        if (this.props.month < 13) {
            return <NormalMonth year={this.props.year} month={this.props.month} todayJDN={this.props.todayJDN}/>;
        } else {
            return <ComplementaryDays year={this.props.year} todayJDN={this.props.todayJDN}/>;
        }
    }
}
