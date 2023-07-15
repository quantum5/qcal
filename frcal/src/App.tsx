import React from 'react';
import {Calendar} from './Calendar';
import {FrenchMonth, frEndJD, frStartJD, frSupportedYear, jdnFrench} from '@common/french';
import {dateJDN} from '@common/gregorian';
import {TimeOfDay} from './TimeOfDay';
import {GregorianJumper} from '@common/dateJump';

type YearMonth = {
    year: number;
    month: FrenchMonth;
}

function parseURL(): YearMonth | null {
    const match = /\/(-?\d+)\/(\d+)/.exec(window.location.pathname);
    if (!match)
        return null;

    const month = +match[2];
    const year = +match[1];
    if (!frSupportedYear(year) || month < 1 || month > 13)
        return null;
    return {year: year, month: month as FrenchMonth};
}

type AppState = YearMonth & {
    todayJDN: number,
};

class App extends React.Component<{}, AppState> {
    state: AppState;

    constructor(props: {}) {
        super(props);
        const todayJDN = dateJDN(new Date());
        const {year, month} = jdnFrench(todayJDN);

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
        const {year, month} = jdnFrench(Math.min(Math.max(frStartJD, jdn), frEndJD));
        this.setState({year, month});
    };

    render() {
        return <>
            <Calendar
                year={this.state.year} month={this.state.month} todayJDN={this.state.todayJDN}
                onSwitch={(year, month) => {
                    this.setState({year, month});
                }}/>

            <TimeOfDay onDateChange={this.onDateChange}/>

            <div className="navigate">
                <h4>Go to a date</h4>
                <GregorianJumper minJDN={frStartJD} maxJDN={frEndJD} todayJDN={this.state.todayJDN}
                                 onJump={this.goToJDN}/>
            </div>
        </>;
    }
}

export default App;
