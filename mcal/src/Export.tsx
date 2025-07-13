import {dateName, jdnFrench} from '@common/french';
import {jdnGregorian} from '@common/gregorian';
import React from 'react';
import GregorianSelector from '@common/dateJump/GregorianSelector';
import {BaseDateProps} from '@common/dateJump/base';

function zeroPad(item: unknown, width: number) {
    const n = item + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}


export function* iCalStream(startJDN: number, endJDN: number): Generator<string> {
    yield `BEGIN:VCALENDAR\r
VERSION:2.0\r
PRODID:-//hacksw/handcal//NONSGML v1.0//EN\r
`;

    for (let jdn = startJDN; jdn <= endJDN; ++jdn) {
        const [gy, gm, gd] = jdnGregorian(jdn);
        const {year: fy, month: fm, day: fd} = jdnFrench(jdn);
        yield `BEGIN:VEVENT\r
UID:jdn-${jdn}@frcal.qt.ax\r
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '')}\r
DTSTART;VALUE=DATE:${zeroPad(gy, 4)}${zeroPad(gm, 2)}${zeroPad(gd, 2)}\r
SUMMARY:${dateName(fm, fd)} ${fy}\r
TRANSP:TRANSPARENT\r
END:VEVENT\r
`;
    }

    yield 'END:VCALENDAR\r\n';
}

function iCalBlob(startJDN: number, endJDN: number): Blob {
    return new Blob(iCalStream(startJDN, endJDN) as any, {type: 'text/calendar'});
}

function downloadAs(url: string, name: string) {
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

type Props = BaseDateProps;

export default function Export(props: Props): JSX.Element {
    const [rangeStart, setRangeStart] = React.useState<number | undefined>();
    const [rangeEnd, setRangeEnd] = React.useState<number | undefined>();

    function doExport(event: React.FormEvent) {
        event.preventDefault();

        if (rangeStart === undefined || rangeEnd === undefined) {
            alert('Date out of range!');
            return;
        }

        const days = rangeEnd - rangeStart;
        if (days > 36500 && !window.confirm(
            `You are exporting ${days} days of calendar data. This may crash your computer. Do you want to continue?`,
        ))
            return;

        const blob = iCalBlob(rangeStart, rangeEnd);
        const [sy, sm, sd] = jdnGregorian(rangeStart);
        const [ey, em, ed] = jdnGregorian(rangeEnd);
        const startDate = `${zeroPad(sy, 4)}-${zeroPad(sm, 2)}-${zeroPad(sd, 2)}`;
        const endDate = `${zeroPad(ey, 4)}-${zeroPad(em, 2)}-${zeroPad(ed, 2)}`;
        downloadAs(URL.createObjectURL(blob), `frcal-${startDate}-${endDate}.ics`);
    }

    return <form onSubmit={doExport}>
        <div className="input-group gregorian-select">
            <span className="input-group-text">Start date</span>
            <GregorianSelector onChange={setRangeStart} {...props}/>
        </div>

        <div className="input-group gregorian-select">
            <span className="input-group-text">End date</span>
            <GregorianSelector onChange={setRangeEnd} {...props} initialJDN={props.initialJDN + 365 * 5}/>
        </div>

        <button type="submit" className="form-control btn btn-primary"
                title="Export calendar as .ics file (iCalendar format)">Export
        </button>
    </form>;
}
