import React from 'react';
import {Calendar} from './Calendar';
import {FrenchMonth, frEndJD, frStartJD, frSupportedYear, jdnFrench} from '@common/french';
import {JulianMonth} from '@common/gregorian';
import {TimeOfDay} from './TimeOfDay';
import {GregorianJumper} from '@common/dateJump';
import MonthBasedApp from '@common/ui/MonthBasedApp';
import Export from './Export';

export default class App extends MonthBasedApp<number, FrenchMonth> {
    override parseYearMonth(year: string, month: string) {
        if (!frSupportedYear(+year) || +month < 1 || +month > 13)
            return null;
        return {year: +year, month: +month as JulianMonth};
    }

    override defaultSelector(todayJDN: number) {
        const {year, month} = jdnFrench(todayJDN);
        return {year, month};
    }

    goToJDN = (jdn: number) => {
        const {year, month} = jdnFrench(Math.min(Math.max(frStartJD, jdn), frEndJD));
        this.setState({selector: {year, month}});
    };

    render() {
        const {selector: {year, month}, todayJDN} = this.state;
        return <>
            <Calendar
                year={year} month={month} todayJDN={todayJDN}
                onSwitch={(year, month) => this.setState({selector: {year, month}})}/>

            <TimeOfDay onDateChange={this.onDateChange}/>

            <div className="navigate">
                <h4>Go to a date</h4>
                <GregorianJumper minJDN={frStartJD} maxJDN={frEndJD} initialJDN={todayJDN}
                                 onJump={this.goToJDN}/>
            </div>

            <div className="download">
                <h4>Export calendar</h4>
                <Export minJDN={frStartJD} maxJDN={frEndJD} initialJDN={todayJDN}/>
            </div>
        </>;
    }
}
