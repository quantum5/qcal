import {dateName, frJDN, gregorianJDN, monthName} from './dates';

describe('gregorianJDN', () => {
    it('works', () => {
        expect(gregorianJDN(2000, 1, 1)).toBe(2451545);
        expect(gregorianJDN(-4713, 11, 24)).toBe(0);
        expect(gregorianJDN(11917, 9, 18)).toBe(6073915);
        expect(gregorianJDN(-28565, 6, 17)).toBe(-8711925);
        expect(gregorianJDN(-26650, 4, 13)).toBe(-8012550);
        expect(gregorianJDN(17430, 3, 8)).toBe(8087303);
        expect(gregorianJDN(3395, 7, 18)).toBe(2961257);
        expect(gregorianJDN(4579, 3, 11)).toBe(3393575);
        expect(gregorianJDN(-14851, 11, 22)).toBe(-3702831);
        expect(gregorianJDN(8824, 11, 28)).toBe(4944292);
        expect(gregorianJDN(19720, 8, 14)).toBe(8923868);
        expect(gregorianJDN(7504, 7, 22)).toBe(4462042);
    });
});

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
