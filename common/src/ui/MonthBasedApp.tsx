import BaseApp from './BaseApp';


type Selector<Year, Month> = {
    year: Year;
    month: Month;
}

export default abstract class MonthBasedApp<Year, Month> extends BaseApp<Selector<Year, Month>> {
    abstract parseYearMonth(year: string, month: string): Selector<Year, Month> | null;

    override parsePath(): Selector<Year, Month> | null {
        const match = /\/(-?\d+)\/(\d+)/.exec(window.location.pathname);
        if (!match)
            return null;
        return this.parseYearMonth(match[1], match[2]);
    }

    override generatePath({year, month}: Selector<Year, Month>) {
        return `/${year}/${month}`;
    }
}
