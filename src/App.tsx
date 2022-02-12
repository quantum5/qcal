import React from 'react';
import './App.css';
import {Calendar} from './Calendar';
import {gregorianJDN, Month} from "./dates";

type YearMonth = {
    year: number;
    month: Month;
}

function parseURL(): YearMonth | null {
    const match = /\/(-?\d+)\/(\d+)/.exec(window.location.pathname);
    if (!match)
        return null;

    const month = +match[2];
    if (month < 1 || month > 13)
        return null;
    return {year: +match[1], month: month as Month};
}

type AppState = YearMonth & {
    todayJDN: number,
};

class App extends React.Component<{}, AppState> {
    state: AppState;

    constructor(props: {}) {
        super(props);
        const current = {year: 230, month: 5};
        const today = new Date();

        this.state = {
            ...(parseURL() || current as YearMonth),
            todayJDN: gregorianJDN(today.getFullYear(), today.getMonth() + 1, today.getDay()),
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
