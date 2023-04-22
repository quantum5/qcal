import React, {FormEvent} from 'react';
import {Calendar} from './Calendar';
import {frEndJD, frStartJD} from '@common/french';
import {dateJDN, gregorianJDN, JulianMonth} from '@common/gregorian';
import {DayChanger} from '@common/DayChanger';
import {jdnJulian} from '@common/julian';

// Not real limitations other than JS number precision.
const START_YEAR = -10_000_000_000_000;
const END_YEAR = 10_000_000_000_000;

type YearMonth = {
    year: number;
    month: JulianMonth;
}

function parseURL(): YearMonth | null {
    const match = /\/(-?\d+)\/(\d+)/.exec(window.location.pathname);
    if (!match)
        return null;

    const month = +match[2];
    const year = +match[1];
    if (month < 1 || month > 23)
        return null;
    return {year: year, month: month as JulianMonth};
}

type AppState = YearMonth & {
    todayJDN: number,
    goYear: string,
    goMonth: string,
    goDay: string,
};

class App extends React.Component<{}, AppState> {
    state: AppState;

    constructor(props: {}) {
        super(props);
        const today = new Date();
        const todayJDN = dateJDN(today);
        const [year, month] = jdnJulian(todayJDN);

        this.state = {
            ...(parseURL() || {year, month}),
            todayJDN,
            goYear: today.getFullYear().toString(),
            goMonth: (today.getMonth() + 1).toString(),
            goDay: today.getDate().toString(),
        };
        this.updateStateFromURL = this.updateStateFromURL.bind(this);
    }

    componentDidMount() {
        window.addEventListener('popstate', this.updateStateFromURL);
    }

    componentWillUnmount() {
        window.removeEventListener('popstate', this.updateStateFromURL);
    }

    private updateStateFromURL(event: PopStateEvent) {
        this.setState(event.state);
    }

    private updateURL() {
        const {year, month} = this.state;
        const path = `/${year}/${month}`;
        if (path !== window.location.pathname) {
            window.history.pushState({year, month}, '', path);
        }
    }

    changeField(field: keyof AppState, event: any) {
        this.setState({[field]: event.target.value});
    }

    validYear() {
        return /^-?\d+$/.test(this.state.goYear) && START_YEAR <= +this.state.goYear && +this.state.goYear <= END_YEAR;
    }

    validMonth() {
        return /^\d+$/.test(this.state.goMonth) && 1 <= +this.state.goMonth && +this.state.goMonth <= 12;
    }

    validDay() {
        return /^\d+$/.test(this.state.goDay) && 1 <= +this.state.goDay && +this.state.goDay <= 31;
    }

    goToGregorian(event: FormEvent) {
        event.preventDefault();

        if (!this.validYear() || !this.validMonth() || !this.validDay())
            return;

        const jdn = gregorianJDN(+this.state.goYear, +this.state.goMonth, +this.state.goDay);
        const [year, month] = jdnJulian(Math.min(Math.max(frStartJD, jdn), frEndJD));
        this.setState({year, month});
    }

    setState(state: any, callback?: () => void) {
        super.setState(state, () => {
            this.updateURL();
            callback?.();
        });
    }

    onDateChange = (todayJDN: number) => {
        this.setState({todayJDN});
    };

    render() {
        return <>
            <Calendar
                year={this.state.year} month={this.state.month} todayJDN={this.state.todayJDN}
                onSwitch={(year, month) => {
                    this.setState({year, month});
                }}/>

            <DayChanger onDateChange={this.onDateChange}/>

            <div className="navigate">
                <h4>Go to a date</h4>
                <form className="input-group" onSubmit={this.goToGregorian.bind(this)}>
                    <span className="input-group-text">Gregorian<span className="hide-small">&nbsp;Date</span></span>
                    <input type="number" className={`form-control go-year ${this.validYear() ? '' : 'is-invalid'}`}
                           onChange={this.changeField.bind(this, 'goYear')} value={this.state.goYear}
                           min={START_YEAR} max={END_YEAR}/>
                    <input type="number" className={`form-control go-month ${this.validMonth() ? '' : 'is-invalid'}`}
                           onChange={this.changeField.bind(this, 'goMonth')} value={this.state.goMonth}
                           min={1} max={12}/>
                    <input type="number" className={`form-control go-day ${this.validDay() ? '' : 'is-invalid'}`}
                           onChange={this.changeField.bind(this, 'goDay')} value={this.state.goDay}
                           min={1} max={31}/>
                    <button type="submit" className="form-control btn btn-primary go-button">Go</button>
                </form>
            </div>
        </>;
    }
}

export default App;
