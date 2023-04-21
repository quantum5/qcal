import {gregorianJDN, jdnGregorian} from './gregorian';

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

describe('jdnGregorian', () => {
    it('works', () => {
        expect(jdnGregorian(0)).toEqual(new Date(-4713, 10, 24));
        expect(jdnGregorian(2299160)).toEqual(new Date(1582, 9, 14));
        expect(jdnGregorian(2299161)).toEqual(new Date(1582, 9, 15));
        expect(jdnGregorian(2361221)).toEqual(new Date(1752, 8, 13));
        expect(jdnGregorian(2361222)).toEqual(new Date(1752, 8, 14));
        expect(jdnGregorian(2451545)).toEqual(new Date(2000, 0, 1));
        expect(jdnGregorian(-8512316)).toEqual(new Date(-28019, 11, 20));
        expect(jdnGregorian(-8534852)).toEqual(new Date(-28080, 3, 8));
        expect(jdnGregorian(2653462)).toEqual(new Date(2552, 9, 30));
        expect(jdnGregorian(3271156)).toEqual(new Date(4244, 0, 8));
        expect(jdnGregorian(-666477)).toEqual(new Date(-6537, 1, 23));
        expect(jdnGregorian(2397854)).toEqual(new Date(1852, 11, 31));
        expect(jdnGregorian(-1211235)).toEqual(new Date(-8029, 7, 26));
        expect(jdnGregorian(-91680)).toEqual(new Date(-4964, 10, 20));
        expect(jdnGregorian(-5605876)).toEqual(new Date(-20061, 6, 14));
        expect(jdnGregorian(-295121)).toEqual(new Date(-5521, 10, 19));
    });
});
