import {gregorianJDN, jdnGregorian, gregorianMonthDays, JulianDate, JulianMonth} from './gregorian';

export function julianJDN(year: number, month: number, day: number): number {
    return gregorianJDN(year, month, day, Infinity);
}

export function jdnJulian(jdn: number): JulianDate {
    return jdnGregorian(jdn, Infinity);
}

export function julianMonthDays(year: number, month: JulianMonth): 28 | 29 | 30 | 31 {
    return gregorianMonthDays(year, month, true);
}
