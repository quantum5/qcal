import React from 'react';
import {Calendar} from './Calendar';
import {GregorianJumper} from '@common/dateJump';
import MonthBasedApp from '@common/ui/MonthBasedApp';
import {haabExtJDN, HaabMonth, haabMonthDays, HaabYear, jdnHaabExt} from '@common/mayan';
import {gregorianJDN} from '@common/gregorian';
import {DayChanger} from '@common/ui/DayChanger';
import LongCountJumper from './LongCountJumper';
import TzolkinJumper from './TzolkinJumper';

// Not real limitations other than JS number precision.
const START_JDN = gregorianJDN(-10_000_000_000_000, 1, 1);
const END_JDN = gregorianJDN(10_000_000_000_000, 12, 31);

export default class App extends MonthBasedApp<HaabYear, HaabMonth> {
    override parseYearMonth(year: string, month: string) {
        if (+month < 1 || +month > 19)
            return null;
        return {year: +year, month: +month as HaabMonth};
    }

    override defaultSelector(todayJDN: number) {
        const {year, month} = jdnHaabExt(todayJDN);
        return {year, month};
    }

    goToJDN = (jdn: number) => {
        const {year, month} = jdnHaabExt(jdn);
        this.setState({selector: {year, month}});
    };

    render() {
        const {selector: {year, month}, todayJDN} = this.state;
        const haabStartJDN = haabExtJDN({year, month, day: 0});

        return <>
            <Calendar
              year={year} month={month} todayJDN={todayJDN}
              onSwitch={(year, month) => this.setState({selector: {year, month}})}/>

            <DayChanger onDateChange={this.onDateChange}/>

            <div className="navigate">
                <h4>Go to a date</h4>

                <div className="navigators">
                    <GregorianJumper minJDN={START_JDN} maxJDN={END_JDN} initialJDN={todayJDN} onJump={this.goToJDN}/>
                    <LongCountJumper initialJDN={todayJDN} onJump={this.goToJDN}/>
                    <TzolkinJumper initialJDN={todayJDN} onJump={this.goToJDN} haabStartJDN={haabStartJDN} haabEndJDN={haabStartJDN + haabMonthDays(month)}/>
                </div>
            </div>
        </>;
    }
}
