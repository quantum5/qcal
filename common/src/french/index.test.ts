import {
    dateName,
    dateRuralName,
    frIsLeap,
    frJDN,
    jdnFrench,
    monthName
} from './index';

describe('frJDN', () => {
    it('works for sample dates', () => {
        expect(frJDN(1, 1, 1)).toBe(2375840);
        expect(frJDN(8, 2, 18)).toBe(2378444);
    });

    it('works in years starting/ending near midnight', () => {
        expect(frJDN( 111, 1, 1)).toBe(2416017); // equinox 1902-09-23T23:55:19 UT1
        expect(frJDN( 206, 1, 1)).toBe(2450715); // equinox 1997-09-22T23:55:46 UT1
        expect(frJDN(2490, 1, 1)).toBe(3284926); // equinox 4281-09-20T23:50:38 UT1
    });
});

describe('frIsLeap', () => {
    it('works for sample dates', () => {
        expect(frIsLeap(1)).toBeFalsy();
        expect(frIsLeap(8)).toBeFalsy();
        expect(frIsLeap(3)).toBeTruthy();
        expect(frIsLeap(7)).toBeTruthy();
        expect(frIsLeap(11)).toBeTruthy();
    });

    it('works in years starting/ending near midnight', () => {
        expect(frIsLeap(110)).toBeTruthy();
        expect(frIsLeap(205)).toBeTruthy();
        expect(frIsLeap(2489)).toBeFalsy();
        expect(frIsLeap(111)).toBeFalsy();
        expect(frIsLeap(206)).toBeFalsy();
        expect(frIsLeap(2490)).toBeTruthy();
    });
});

describe('jdnFrench', () => {
    it('works for sample dates', () => {
        expect(jdnFrench(2375840)).toEqual({year: 1, month: 1, day: 1});
        expect(jdnFrench(2378444)).toEqual({year: 8, month: 2, day: 18});
    });

    it('works in years starting/ending near midnight', () => {
        expect(jdnFrench(2416017)).toEqual({year:  111, month: 1, day: 1});
        expect(jdnFrench(2450715)).toEqual({year:  206, month: 1, day: 1});
        expect(jdnFrench(3284926)).toEqual({year: 2490, month: 1, day: 1});
        expect(jdnFrench(2416016)).toEqual({year:  110, month: 13, day: 6});
        expect(jdnFrench(2450714)).toEqual({year:  205, month: 13, day: 6});
        expect(jdnFrench(3284925)).toEqual({year: 2489, month: 13, day: 5});
    });
});

describe('monthName', () => {
    it('works', () => {
        expect(monthName(1)).toBe('Vendémiaire');
        expect(monthName(12)).toBe('Fructidor');
        expect(monthName(13)).toBe('Jours Complémentaires');
    });
});

describe('dateName', () => {
    it('works', () => {
        expect(dateName(1, 1)).toBe('1 Vendémiaire');
        expect(dateName(2, 18)).toBe('18 Brumaire');
        expect(dateName(3, 11)).toBe('11 Frimaire');
        expect(dateName(8, 16)).toBe('16 Floréal');
        expect(dateName(12, 30)).toBe('30 Fructidor');
        expect(dateName(13, 1)).toBe('La Fête de la Vertu');
        expect(dateName(13, 6)).toBe('La Fête de la Révolution');
    });

    it('returns null for non-existent complimentary days', () => {
        expect(dateName(13, 7)).toBeNull();
    });
});

describe('dateRuralName', () => {
    it('works', () => {
        expect(dateRuralName(1, 1)).toEqual({name: 'Raisin', title: 'Grape'});
        expect(dateRuralName(1, 30)).toEqual({name: 'Tonneau', title: 'Barrel'});
        expect(dateRuralName(12, 1)).toEqual({name: 'Prune', title: 'Plum'});
        expect(dateRuralName(12, 30)).toEqual({name: 'Panier', title: 'Pack Basket'});
    });

    it('returns null for complimentary days', () => {
        expect(dateRuralName(13, 1)).toBeNull();
    });
});
