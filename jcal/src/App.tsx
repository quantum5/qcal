import React from 'react';
import {Calendar} from './Calendar';
import {gregorianJDN, JulianMonth} from '@common/gregorian';
import {DayChanger} from '@common/ui/DayChanger';
import {jdnJulian} from '@common/julian';
import {GregorianJumper} from '@common/dateJump';
import MonthBasedApp from '@common/ui/MonthBasedApp';

// Not real limitations other than JS number precision.
const START_JDN = gregorianJDN(-10_000_000_000_000, 1, 1);
const END_JDN = gregorianJDN(10_000_000_000_000, 12, 31);

export default class App extends MonthBasedApp<number, JulianMonth> {
    override parseYearMonth(year: string, month: string) {
        if (+month < 1 || +month > 12)
            return null;
        return {year: +year, month: +month as JulianMonth};
    }

    override defaultSelector(todayJDN: number) {
        const [year, month] = jdnJulian(todayJDN);
        return {year, month};
    }

    goToJDN = (jdn: number) => {
        const [year, month] = jdnJulian(jdn);
        this.setState({selector: {year, month}});
    };

    render() {
        const {selector: {year, month}, todayJDN} = this.state;
        return <>
            <Calendar
                year={year} month={month} todayJDN={todayJDN}
                onSwitch={(year, month) => this.setState({selector: {year, month}})}/>

            <DayChanger onDateChange={this.onDateChange}/>

            <div className="navigate">
                <h4>Go to a date</h4>
                <GregorianJumper minJDN={START_JDN} maxJDN={END_JDN} initialJDN={todayJDN} onJump={this.goToJDN}/>
            </div>
        </>;
    }
}
