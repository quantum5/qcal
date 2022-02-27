import React from 'react';
import './TimeOfDay.scss';
import {gregorianJDN} from './dates';

type TimeStamp = {
    hour: number,
    minute: number,
    second: number,
};

type DecimalTimeStamp = TimeStamp;
type NormalTimeStamp = TimeStamp;

function currentDayMs(): number {
    const now = new Date();
    return now.getHours() * 3_600_000 + now.getMinutes() * 60_000 + now.getSeconds() * 1000 + now.getMilliseconds();
}

export function dayMsToDecimal(dayMs: number): DecimalTimeStamp {
    const second = Math.floor(dayMs / 864 % 100);
    const minute = Math.floor(dayMs / 86_400 % 100);
    const hour = Math.floor(dayMs / 8_640_000);
    return {hour, minute, second};
}

export function decimalToDayMs({hour, minute, second}: DecimalTimeStamp): number {
    return 864 * (hour * 10_000 + minute * 100 + second);
}

function timePad(value: number): string {
    return value.toString().padStart(2, '0');
}

type TimeOfDayProps = {
    onDateChange?: (jdn: number) => void,
};

type TimeOfDayState = {
    decimal: DecimalTimeStamp,
    decimalTimer: number,
    normal: NormalTimeStamp,
    normalTimer: number,
    jdn: number,
};

export class TimeOfDay extends React.Component<TimeOfDayProps, TimeOfDayState> {
    constructor(props: TimeOfDayProps) {
        super(props);
        const zero = {hour: 0, minute: 0, second: 0};
        this.state = {
            decimal: zero,
            decimalTimer: 0,
            normal: zero,
            normalTimer: 0,
            jdn: 0,
        };
    }

    componentDidMount() {
        this.updateDecimalTime();
        this.updateNormalTime();
    }

    componentWillUnmount() {
        if (this.state.decimalTimer) {
            clearTimeout(this.state.decimalTimer);
        }
        if (this.state.normalTimer) {
            clearTimeout(this.state.normalTimer);
        }
        this.setState({decimalTimer: 0, normalTimer: 0});
    }

    updateDecimalTime = () => {
        const now = currentDayMs();
        const {hour, minute, second} = dayMsToDecimal(now);
        const nextTick = decimalToDayMs({hour, minute, second: second + 1});
        const decimalTimer = window.setTimeout(this.updateDecimalTime, nextTick - now);
        this.setState({decimal: {hour, minute, second}, decimalTimer});
    }

    updateNormalTime = () => {
        const now = new Date();
        const jdn = gregorianJDN(now.getFullYear(), now.getMonth() + 1, now.getDate());
        if (this.props.onDateChange && jdn !== this.state.jdn) {
            this.props.onDateChange(jdn);
        }

        const normalTimer = window.setTimeout(this.updateNormalTime, 1000 - now.getMilliseconds());
        this.setState({
            normal: {
                hour: now.getHours(),
                minute: now.getMinutes(),
                second: now.getSeconds()
            },
            normalTimer,
            jdn,
        });
    }

    render() {
        return <div className="TimeOfDay">
            <h4>Time of Day</h4>
            <div className="TimeOfDay-Rows">
                <div className="TimeOfDay-Style">
                    <strong>Decimal time:</strong>
                    <span className="TimeOfDay-Value">
                        {this.state.decimal.hour}:
                        {timePad(this.state.decimal.minute)}:
                        {timePad(this.state.decimal.second)}
                    </span>
                </div>
                <div className="TimeOfDay-Style">
                    <strong>24-hour time:</strong>
                    <span className="TimeOfDay-Value">
                        {timePad(this.state.normal.hour)}:
                        {timePad(this.state.normal.minute)}:
                        {timePad(this.state.normal.second)}
                    </span>
                </div>
            </div>
        </div>;
    }
}
