import React from 'react';
import {Calendar} from './Calendar';
import {dateJDN, gregorianJDN, JulianMonth} from '@common/gregorian';
import {DayChanger} from '@common/DayChanger';
import {jdnJulian} from '@common/julian';
import {GregorianJumper} from '@common/dateJump';

// Not real limitations other than JS number precision.
const START_JDN = gregorianJDN(-10_000_000_000_000, 1, 1);
const END_JDN = gregorianJDN(10_000_000_000_000, 12, 31);

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
};

class App extends React.Component<{}, AppState> {
    state: AppState;

    constructor(props: {}) {
        super(props);
        const todayJDN = dateJDN(new Date());
        const [year, month] = jdnJulian(todayJDN);

        this.state = {
            ...(parseURL() || {year, month}),
            todayJDN,
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

    setState(state: any, callback?: () => void) {
        super.setState(state, () => {
            this.updateURL();
            callback?.();
        });
    }

    onDateChange = (todayJDN: number) => {
        this.setState({todayJDN});
    };

    goToJDN = (jdn: number) => {
        const [year, month] = jdnJulian(jdn);
        this.setState({year, month});
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
                <GregorianJumper minJDN={START_JDN} maxJDN={END_JDN} todayJDN={this.state.todayJDN}
                                 onJump={this.goToJDN}/>
            </div>
        </>;
    }
}

export default App;
