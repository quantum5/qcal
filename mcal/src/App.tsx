import React from 'react';
import {Calendar} from './Calendar';
import {GregorianJumper} from '@common/dateJump';
import MonthBasedApp from '@common/ui/MonthBasedApp';
import {HaabMonth, HaabYear, jdnHaabExt} from '@common/mayan';
import {gregorianJDN} from '@common/gregorian';

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
        return <>
            <Calendar
              year={year} month={month} todayJDN={todayJDN}
              onSwitch={(year, month) => this.setState({selector: {year, month}})}/>

            <div className="navigate">
                <h4>Go to a date</h4>
                <GregorianJumper minJDN={START_JDN} maxJDN={END_JDN} initialJDN={todayJDN} onJump={this.goToJDN}/>
            </div>
        </>;
    }
}
