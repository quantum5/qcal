import {jdnJulian, julianJDN} from './julian';

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
