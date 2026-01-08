import React from 'react';
import {jdnLongCount, LongCount, longCountJDN} from '@common/longCount';

function LongCountSelector({initial, onChange}: {
    initial: LongCount,
    onChange: (longCount: LongCount | undefined) => void
}): JSX.Element {
    const [input, setInput] = React.useState(() => initial.join('.'));
    const valid = /^(?:(?:[02-9]|1[0-9])\.){3}(?:[02-9]|1[0-7])\.(?:[02-9]|1[0-9])$/.test(input);

    React.useEffect(
      () => onChange(valid ? input.split('.').map(x => +x) : undefined),
      [onChange, input, valid],
    );

    return <input type="text" className={`form-control long-count${valid ? '' : ' is-invalid'}`}
                  onChange={e => setInput(e.target.value)} value={input}/>;
}

export default function LongCountJumper({onJump, initialJDN}: {
    onJump: (jdn: number) => void;
    initialJDN: number;
}): JSX.Element {
    const [jdn, setJDN] = React.useState<number | undefined>();

    function onSubmit(event: React.FormEvent) {
        event.preventDefault();
        jdn !== undefined && onJump(jdn);
    }

    function onLongCountChange(longCount: LongCount | undefined): void {
        setJDN(longCount && longCountJDN(longCount));
    }

    return <form className="input-group long-count-select" onSubmit={onSubmit}>
        <span className="input-group-text">Long Count <span className="hide-small">&nbsp;Date</span></span>
        <LongCountSelector onChange={onLongCountChange} initial={jdnLongCount(initialJDN) || [0, 0, 0, 0, 0]}/>
        <button type="submit" className="form-control btn btn-primary">Go</button>
    </form>;
}
