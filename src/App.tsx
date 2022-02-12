import React from 'react';
import {Calendar} from './Calendar';
import {frSupportedYear, gregorianJDN, jdnFrench, Month} from './dates';

type YearMonth = {
    year: number;
    month: Month;
}

function parseURL(): YearMonth | null {
    const match = /\/(-?\d+)\/(\d+)/.exec(window.location.pathname);
    if (!match)
        return null;

    const month = +match[2];
    const year = +match[1];
    if (!frSupportedYear(year) || month < 1 || month > 13)
        return null;
    return {year: year, month: month as Month};
}

type AppState = YearMonth & {
    todayJDN: number,
};

class App extends React.Component<{}, AppState> {
    state: AppState;

    constructor(props: {}) {
        super(props);
        const today = new Date();
        const todayJDN = gregorianJDN(today.getFullYear(), today.getMonth() + 1, today.getDate());
        const {year, month} = jdnFrench(todayJDN);

        this.state = {
            ...(parseURL() || {year, month}),
            todayJDN,
        };
        this.updateURL();
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
            callback && callback();
        });
    }

    render() {
        return <Calendar
            year={this.state.year} month={this.state.month} todayJDN={this.state.todayJDN}
            onSwitch={(year, month) => {
                this.setState({year, month})
            }}/>;
    }
}

export default App;
