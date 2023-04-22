import {jdnJulian, julianJDN, julianMonthDays} from './julian';

describe('gregorianJDN', () => {
    it('works', () => {
        expect(julianJDN(2000, 1, 1)).toBe(2451558);
        expect(julianJDN(1969, 7, 20)).toBe(2440436);
        expect(julianJDN(1582, 10, 15)).toBe(2299171);
        expect(julianJDN(1582, 10, 4)).toBe(2299160);
        expect(julianJDN(1066, 10, 14)).toBe(2110701);
        expect(julianJDN(0, 12, 25)).toBe(1721417);
        expect(julianJDN(-4712, 1, 1)).toBe(0);
    });
});

describe('jdnGregorian', () => {
    it('works', () => {
        expect(jdnJulian(2451558)).toEqual([2000, 1, 1]);
        expect(jdnJulian(2440436)).toEqual([1969, 7, 20]);
        expect(jdnJulian(2299171)).toEqual([1582, 10, 15]);
        expect(jdnJulian(2299160)).toEqual([1582, 10, 4]);
        expect(jdnJulian(2110701)).toEqual([1066, 10, 14]);
        expect(jdnJulian(1721417)).toEqual([0, 12, 25]);
        expect(jdnJulian(0)).toEqual([-4712, 1, 1]);
    });
});

describe('monthLength', () => {
    it('works for normal months', () => {
        expect(julianMonthDays(2023, 1)).toEqual(31); // January
        expect(julianMonthDays(2023, 3)).toEqual(31); // March
        expect(julianMonthDays(2023, 4)).toEqual(30); // April
        expect(julianMonthDays(2023, 5)).toEqual(31); // May
        expect(julianMonthDays(2023, 6)).toEqual(30); // June
        expect(julianMonthDays(2023, 7)).toEqual(31); // July
        expect(julianMonthDays(2023, 8)).toEqual(31); // August
        expect(julianMonthDays(2023, 9)).toEqual(30); // September
        expect(julianMonthDays(2023, 10)).toEqual(31); // October
        expect(julianMonthDays(2023, 11)).toEqual(30); // November
        expect(julianMonthDays(2023, 12)).toEqual(31); // December
    });

    it('handles Gregorian leap years correctly', () => {
        // Leap year: divisible by 400
        expect(julianMonthDays(1600, 2)).toEqual(29);
        expect(julianMonthDays(2000, 2)).toEqual(29);
        expect(julianMonthDays(2400, 2)).toEqual(29);

        // Leap year in Julian calendar: divisible by 100 but not by 400
        expect(julianMonthDays(1700, 2)).toEqual(29);
        expect(julianMonthDays(1800, 2)).toEqual(29);
        expect(julianMonthDays(1900, 2)).toEqual(29);
        expect(julianMonthDays(2100, 2)).toEqual(29);

        // Leap year: divisible by 4 but not by 100
        expect(julianMonthDays(2004, 2)).toEqual(29);
        expect(julianMonthDays(2008, 2)).toEqual(29);
        expect(julianMonthDays(2012, 2)).toEqual(29);
        expect(julianMonthDays(2016, 2)).toEqual(29);

        expect(julianMonthDays(2001, 2)).toEqual(28);
        expect(julianMonthDays(2002, 2)).toEqual(28);
        expect(julianMonthDays(2003, 2)).toEqual(28);
    });
});
