import React from 'react';
import {jdnTzolkin, nextTzolkin, prevTzolkin, Tzolkin, TzolkinName, tzolkinName, TzolkinNumber} from '@common/mayan';

function TzolkinSelector({initial, onChange}: {
    initial: Tzolkin,
    onChange: (tzolkin: Tzolkin | undefined) => void
}): JSX.Element {
    const [number, setNumber] = React.useState(initial.number.toString());
    const [name, setName] = React.useState(initial.name);

    const validNumber = /^\d+$/.test(number) && +number > 0 && +number <= 13;
    const valid = validNumber;

    React.useEffect(
      () => onChange(valid ? {number: +number as TzolkinNumber, name} : undefined),
      [onChange, valid, number, name],
    );

    return <>
        <input type="number" className={`form-control tzolkin-number ${validNumber ? '' : ' is-invalid'}`}
               onChange={e => setNumber(e.target.value)} value={number}
               min={1} max={13}/>
        <select className="form-control tzolkin-name" value={name} onChange={e => setName(+e.target.value)}>
            {Array.from(Array(19).keys()).map(i => {
                const name = i as TzolkinName;
                return <option key={i} value={name}>{tzolkinName(name)}</option>;
            })}
        </select>
    </>;
}

export default function TzolkinJumper({onJump, initialJDN, haabStartJDN, haabEndJDN}: {
    onJump: (jdn: number) => void;
    initialJDN: number;
    haabStartJDN: number;
    haabEndJDN: number;
}): JSX.Element {
    const [tzolkin, setTzolkin] = React.useState<Tzolkin | undefined>(jdnTzolkin(initialJDN));

    function toPrevTzolkin() {
        tzolkin !== undefined && onJump(prevTzolkin(haabStartJDN - 1, tzolkin));
    }

    function toNextTzolkin() {
        tzolkin !== undefined && onJump(nextTzolkin(haabEndJDN, tzolkin));
    }

    return <form className="input-group long-count-select">
        <span className="input-group-text">Tzolkʼin <span className="hide-small">&nbsp;Date</span></span>
        <TzolkinSelector onChange={setTzolkin} initial={jdnTzolkin(initialJDN)}/>
        <button type="button" className="form-control btn btn-primary" onClick={toPrevTzolkin}>&laquo;</button>
        <button type="button" className="form-control btn btn-primary" onClick={toNextTzolkin}>&raquo;</button>
    </form>;
}
