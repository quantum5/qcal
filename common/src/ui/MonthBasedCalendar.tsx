import React from 'react';

export type CalendarProps<Year, Month> = {
    year: Year;
    month: Month;
    todayJDN: number;
    onSwitch?: (year: Year, month: Month) => void,
};

type CalendarState = {
    selecting: boolean,
    yearStr: string,
};

export abstract class MonthBasedCalendar<Year, Month> extends React.Component<CalendarProps<Year, Month>, CalendarState> {
    selection: React.RefObject<HTMLDivElement>;

    protected constructor(props: CalendarProps<Year, Month>) {
        super(props);
        this.state = {
            selecting: false,
            yearStr: this.yearToString(props.year),
        };
        this.selection = React.createRef();
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside, true);
    }

    componentDidUpdate(prevProps: CalendarProps<Year, Month>) {
        if (prevProps.year !== this.props.year) {
            const yearStr = this.yearToString(this.props.year);
            if (this.state.yearStr !== yearStr) {
                this.setState({yearStr});
            }
        }
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, true);
    }

    goTo(year: Year, month: Month) {
        this.props.onSwitch?.(year, month);
    }

    abstract parseYear(year: string): Year;

    abstract parseMonth(month: string): Month;

    abstract yearToString(year: Year): string;

    abstract monthToString(month: Month): string;

    abstract prevYear(): void;

    abstract prevMonth(): void;

    abstract nextYear(): void;

    abstract nextMonth(): void;

    abstract isValidYear(year: string): boolean;

    abstract jdnLookup(jdn: number): {year: Year, month: Month};

    abstract monthName(year: Year, month: Month): string;

    startSelection = () => {
        this.setState({selecting: true});
    };

    handleClickOutside = (event: any) => {
        if (this.state.selecting && this.selection.current && !this.selection.current.contains(event.target))
            this.setState({selecting: false});
    };

    handleKeyUp = (event: any) => {
        if (event.key === 'Escape')
            this.setState({selecting: false});
    };

    monthChange = (event: any) => {
        this.goTo(this.props.year, this.parseMonth(event.target.value));
    };

    yearChange = (event: any) => {
        if (this.isValidYear(event.target.value)) {
            this.goTo(this.parseYear(event.target.value), this.props.month);
        }
        this.setState({yearStr: event.target.value});
    };

    goToToday = () => {
        const {year, month} = this.jdnLookup(this.props.todayJDN);
        this.goTo(year, month);
        this.setState({selecting: false});
    };

    abstract renderMonthOptions(): JSX.Element[];

    abstract renderBody(): JSX.Element;

    renderPrevArrows(): JSX.Element {
        return <div className="Calendar-prev">
            <button type="button" className="btn btn-secondary" title="Previous year" onClick={this.prevYear}>«</button>
            <button type="button" className="btn btn-secondary" title="Previous month" onClick={this.prevMonth}>‹
            </button>
        </div>;
    }

    renderNextArrows(): JSX.Element {
        return <div className="Calendar-next">
            <button type="button" className="btn btn-secondary" title="Next month" onClick={this.nextMonth}>›</button>
            <button type="button" className="btn btn-secondary" title="Next year" onClick={this.nextYear}>»</button>
        </div>;
    }

    renderMonthName(): JSX.Element {
        const {year, month} = this.props;
        return <div className="Calendar-month-name" onClick={this.startSelection}>{this.monthName(year, month)}</div>;
    }

    renderMonthSelection(): JSX.Element {
        return <div className="Calendar-month-name input-group" ref={this.selection} onKeyUp={this.handleKeyUp}>
            <select className="Calendar-month-input form-control" onChange={this.monthChange}
                    value={this.monthToString(this.props.month)}>
                {this.renderMonthOptions()}
            </select>
            <input type="number" className="Calendar-year-input form-control" value={this.state.yearStr}
                   onChange={this.yearChange}/>
            <button type="button" className="form-control btn btn-primary Calendar-today-button"
                    onClick={this.goToToday}>Today
            </button>
        </div>;
    }

    renderHead(): JSX.Element {
        return <div className="Calendar-head">
            {this.renderPrevArrows()}
            {this.state.selecting ? this.renderMonthSelection() : this.renderMonthName()}
            {this.renderNextArrows()}
        </div>;
    }

    render(): JSX.Element {
        return <div className="Calendar">
            {this.renderHead()}
            {this.renderBody()}
        </div>;
    }
}
