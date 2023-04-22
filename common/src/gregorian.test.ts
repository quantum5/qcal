import {gregorianJDN, jdnDate, jdnGregorian, JulianDay, JulianMonth} from './gregorian';

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

    it('transition to Julian works', () => {
        expect(gregorianJDN(2000, 1, 1, 2299161)).toBe(2451545);
        expect(gregorianJDN(1969, 7, 20, 2299161)).toBe(2440423);
        expect(gregorianJDN(1582, 10, 15, 2299161)).toBe(2299161);
        expect(gregorianJDN(1582, 10, 4, 2299161)).toBe(2299160);
        expect(gregorianJDN(1066, 10, 14, 2299161)).toBe(2110701);
        expect(gregorianJDN(0, 12, 25, 2299161)).toBe(1721417);
        expect(gregorianJDN(-4712, 1, 1, 2299161)).toBe(0);
    });
});

describe('jdnGregorian', () => {
    it('works', () => {
        function checkJDN(jdn: number, year: number, month: JulianMonth, day: JulianDay) {
            expect(jdnGregorian(jdn)).toEqual([year, month, day]);
            expect(jdnDate(jdn)).toEqual(new Date(year, month - 1, day));
        }

        checkJDN(0, -4713, 11, 24);
        checkJDN(2299160, 1582, 10, 14);
        checkJDN(2299161, 1582, 10, 15);
        checkJDN(2361221, 1752, 9, 13);
        checkJDN(2361222, 1752, 9, 14);
        checkJDN(2451545, 2000, 1, 1);
        checkJDN(-8512316, -28019, 12, 20);
        checkJDN(-8534852, -28080, 4, 8);
        checkJDN(2653462, 2552, 10, 30);
        checkJDN(3271156, 4244, 1, 8);
        checkJDN(-666477, -6537, 2, 23);
        checkJDN(2397854, 1852, 12, 31);
        checkJDN(-1211235, -8029, 8, 26);
        checkJDN(-91680, -4964, 11, 20);
        checkJDN(-5605876, -20061, 7, 14);
        checkJDN(-295121, -5521, 11, 19);
    });

    it('transition to Julian works', () => {
        function checkJDN(jdn: number, year: number, month: JulianMonth, day: JulianDay) {
            expect(jdnGregorian(jdn, 2299161)).toEqual([year, month, day]);
            expect(jdnDate(jdn, 2299161)).toEqual(new Date(year, month - 1, day));
        }

        checkJDN(2451545, 2000, 1, 1);
        checkJDN(2440423, 1969, 7, 20);
        checkJDN(2299161, 1582, 10, 15);
        checkJDN(2299160, 1582, 10, 4);
        checkJDN(2110701, 1066, 10, 14);
        checkJDN(1721417, 0, 12, 25);
        checkJDN(0, -4712, 1, 1);
    });
});
