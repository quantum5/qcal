export function gregorianJDN(year: number, month: number, day: number): number {
    const g = year + 4716 - (month <= 2 ? 1 : 0);
    const f = (month + 9) % 12;
    const e = Math.floor(1461 * g / 4) + day - 1402;
    const J = e + Math.floor((153 * f + 2) / 5);
    const dg = 38 - Math.floor(Math.floor((g + 184) / 100) * 3 / 4);
    return J + dg;
}

export function dateJDN(date: Date) {
    return gregorianJDN(date.getFullYear(), date.getMonth() + 1, date.getDate());
}

export function jdnGregorian(jdn: number): Date {
    const e = 4 * (jdn + 1401 + Math.floor(Math.floor((4 * jdn + 274277) / 146097) * 3 / 4) - 38) + 3;
    const h = 5 * Math.floor((e % 1461 + 1461) % 1461 / 4) + 2;
    const day = Math.floor((h % 153 + 153) % 153 / 5) + 1;
    const month = (Math.floor(h / 153) + 2) % 12 + 1;
    const year = Math.floor(e / 1461) - 4716 + Math.floor((14 - month) / 12);
    return new Date(year, month - 1, day);
}
