import React from 'react';
import {Calendar} from './Calendar';
import {JulianMonth} from '@common/gregorian';
import {DayChanger} from '@common/ui/DayChanger';
import {jdnJulian} from '@common/julian';
import MonthBasedApp from '@common/ui/MonthBasedApp';

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

    render() {
        const {selector: {year, month}, todayJDN} = this.state;
        return <>
            <Calendar
                year={year} month={month} todayJDN={todayJDN}
                onSwitch={(year, month) => this.setState({selector: {year, month}})}/>

            <DayChanger onDateChange={this.onDateChange}/>
        </>;
    }
}
