import {gregorianJDN, jdnGregorian, JulianDate} from './gregorian';

export function julianJDN(year: number, month: number, day: number): number {
    return gregorianJDN(year, month, day, Infinity);
}

export function jdnJulian(jdn: number): JulianDate {
    return jdnGregorian(jdn, Infinity);
}
