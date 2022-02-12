import {gregorianJDN} from "./Calendar";

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
