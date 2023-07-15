import * as React from 'react';
import {useEffect} from 'react';

const MobileTooltipContext = React.createContext(false);

export function MobileTooltipProvider({children}: React.PropsWithChildren<{}>): JSX.Element {
    const [mobile, setMobile] = React.useState(false);

    useEffect(() => {
        if (!window.matchMedia)
            return;

        const match = window.matchMedia('(pointer: coarse), (hover: none)');
        const callback = () => setMobile(match.matches);

        callback();
        match.addEventListener('change', callback);
        return () => match.removeEventListener('change', callback);
    }, [setMobile]);

    return <MobileTooltipContext.Provider value={mobile}>
        {children}
    </MobileTooltipContext.Provider>;
}

export function useMobileTooltipProps(): { className: string, tabIndex?: number } {
    return {
        className: 'MobileTooltip',
        ...React.useContext(MobileTooltipContext) ? {tabIndex: 0} : {},
    };
}
