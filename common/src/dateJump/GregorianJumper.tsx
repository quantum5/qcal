import {DateJumperProps} from './base';
import React from 'react';
import GregorianSelector from './GregorianSelector';

export default function GregorianJumper({onJump, ...props}: DateJumperProps): JSX.Element {
    const [jdn, setJDN] = React.useState<number | undefined>();

    function goToGregorian(event: React.FormEvent) {
        event.preventDefault();
        jdn !== undefined && onJump(jdn);
    }

    return <form className="input-group gregorian-select" onSubmit={goToGregorian}>
        <span className="input-group-text">Gregorian<span className="hide-small">&nbsp;Date</span></span>
        <GregorianSelector onChange={setJDN} {...props}/>
        <button type="submit" className="form-control btn btn-primary">Go</button>
    </form>;
}
