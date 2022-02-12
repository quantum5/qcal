import data from '../cal.json';

const startJD = data.start_jd;
const startYear = data.start_year;
const leaps: Array<number> = [0];

let leapFromStart = 0;
data.leap.forEach(leap => {
    leapFromStart += leap;
    leaps.push(leapFromStart);
});

export function gregorianJDN(year: number, month: number, day: number) {
    const g = year + 4716 - (month <= 2 ? 1 : 0);
    const f = (month + 9) % 12;
    const e = Math.floor(1461 * g / 4) + day - 1402;
    const J = e + Math.floor((153 * f + 2) / 5);
    const dg = 38 - Math.floor(Math.floor((g + 184) / 100) * 3 / 4);
    return J + dg;
}

export function frJDN(year: number, month: number, day: number) {
    const dy = year - startYear;
    const dd = month * 30 + day - 31;
    return startJD + 365 * dy + leaps[dy] + dd;
}
