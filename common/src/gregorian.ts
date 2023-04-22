export type JulianMonth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type JulianDay =
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24
    | 25
    | 26
    | 27
    | 28
    | 29
    | 30
    | 31;

export type JulianDate = [number, JulianMonth, JulianDay];

export function gregorianJDN(year: number, month: number, day: number, julian_before?: number): number {
    const g = year + 4716 - (month <= 2 ? 1 : 0);
    const f = (month + 9) % 12;
    const e = Math.floor(1461 * g / 4) + day - 1402;
    const J = e + Math.floor((153 * f + 2) / 5);

    if (julian_before != null && J < julian_before)
        return J;

    const dg = 38 - Math.floor(Math.floor((g + 184) / 100) * 3 / 4);
    return J + dg;
}

export function dateJDN(date: Date, julian_before?: number) {
    return gregorianJDN(date.getFullYear(), date.getMonth() + 1, date.getDate(), julian_before);
}

export function jdnGregorian(jdn: number, julian_before?: number): JulianDate {
    const dg = julian_before == null || jdn >= julian_before ?
        Math.floor(Math.floor((4 * jdn + 274277) / 146097) * 3 / 4) - 38 :
        0;
    const e = 4 * (jdn + 1401 + dg) + 3;
    const h = 5 * Math.floor((e % 1461 + 1461) % 1461 / 4) + 2;
    const day = Math.floor((h % 153 + 153) % 153 / 5) + 1;
    const month = (Math.floor(h / 153) + 2) % 12 + 1;
    const year = Math.floor(e / 1461) - 4716 + Math.floor((14 - month) / 12);
    return [year, month as JulianMonth, day as JulianDay];
}

export function jdnDate(jdn: number, julian_before?: number): Date {
    const [year, month, day] = jdnGregorian(jdn, julian_before);
    return new Date(year, month - 1, day);
}
