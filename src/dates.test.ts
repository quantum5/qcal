import {dateName, frJDN, gregorianJDN, jdnGregorian, monthName} from './dates';

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

describe('jdnGregorian', () => {
    it('works', () => {
        expect(jdnGregorian(0)).toEqual(new Date(-4713, 11, 24));
        expect(jdnGregorian(2299160)).toEqual(new Date(1582, 10, 14));
        expect(jdnGregorian(2299161)).toEqual(new Date(1582, 10, 15));
        expect(jdnGregorian(2361221)).toEqual(new Date(1752, 9, 13));
        expect(jdnGregorian(2361222)).toEqual(new Date(1752, 9, 14));
        expect(jdnGregorian(2451545)).toEqual(new Date(2000, 1, 1));
        expect(jdnGregorian(-8512316)).toEqual(new Date(-28019, 12, 20));
        expect(jdnGregorian(-8534852)).toEqual(new Date(-28080, 4, 8));
        expect(jdnGregorian(2653462)).toEqual(new Date(2552, 10, 30));
        expect(jdnGregorian(3271156)).toEqual(new Date(4244, 1, 8));
        expect(jdnGregorian(-666477)).toEqual(new Date(-6537, 2, 23));
        expect(jdnGregorian(2397854)).toEqual(new Date(1852, 12, 31));
        expect(jdnGregorian(-1211235)).toEqual(new Date(-8029, 8, 26));
        expect(jdnGregorian(-91680)).toEqual(new Date(-4964, 11, 20));
        expect(jdnGregorian(-5605876)).toEqual(new Date(-20061, 7, 14));
        expect(jdnGregorian(-295121)).toEqual(new Date(-5521, 11, 19));
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
