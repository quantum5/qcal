import React from 'react';
import {dateJDN} from '../gregorian';

type AppState<Selector> = {
    selector: Selector;
    todayJDN: number,
};

export default abstract class BaseApp<Selector> extends React.Component<{}, AppState<Selector>> {
    state: AppState<Selector>;

    protected constructor(props: {}) {
        super(props);
        const todayJDN = dateJDN(new Date());

        this.state = {
            selector: this.parsePath() || this.defaultSelector(todayJDN),
            todayJDN,
        };
        this.updateStateFromURL = this.updateStateFromURL.bind(this);
    }

    abstract parsePath(): Selector | null;

    abstract generatePath(selector: Selector): string;

    abstract defaultSelector(todayJDN: number): Selector;

    componentDidMount() {
        window.addEventListener('popstate', this.updateStateFromURL);
    }

    componentWillUnmount() {
        window.removeEventListener('popstate', this.updateStateFromURL);
    }

    private updateStateFromURL(event: PopStateEvent) {
        this.setState(event.state as Selector);
    }

    private updateURL() {
        const path = this.generatePath(this.state.selector);
        if (path !== window.location.pathname) {
            window.history.pushState(this.state.selector, '', path);
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

    abstract render(): JSX.Element;
}
