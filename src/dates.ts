import data from './cal.json';

// Month 13 is for the complementary days
export type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
export type Day =
    1
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
    | 30;

export type FrenchDate = {
    year: number,
    month: Month,
    day: Day,
};

const monthNames: {
    [key in Month]: string
} = {
    1: 'Vendémiaire',
    2: 'Brumaire',
    3: 'Frimaire',
    4: 'Nivôse',
    5: 'Pluviôse',
    6: 'Ventôse',
    7: 'Germinal',
    8: 'Floréal',
    9: 'Prairial',
    10: 'Messidor',
    11: 'Thermidor',
    12: 'Fructidor',
    13: 'Jours Complémentaires',
};

export const decadeNames = [
    'primidi', 'duodi', 'tridi', 'quartidi', 'quintidi', 'sextidi', 'septidi', 'octidi', 'nonidi', 'décadi',
];

const startJD = data.start_jd;
const startYear = data.start_year;
const leaps: Array<number> = [0];

let leapFromStart = 0;
data.leap.forEach(leap => {
    leapFromStart += leap;
    leaps.push(leapFromStart);
});

export function gregorianJDN(year: number, month: number, day: number): number {
    const g = year + 4716 - (month <= 2 ? 1 : 0);
    const f = (month + 9) % 12;
    const e = Math.floor(1461 * g / 4) + day - 1402;
    const J = e + Math.floor((153 * f + 2) / 5);
    const dg = 38 - Math.floor(Math.floor((g + 184) / 100) * 3 / 4);
    return J + dg;
}

export function frJDN(year: number, month: Month, day: Day): number {
    const dy = year - startYear;
    const dd = month * 30 + day - 31;
    return startJD + 365 * dy + leaps[dy] + dd;
}

export function frIsLeap(year: number): boolean {
    return !!data.leap[year - startYear];
}

export function jdnGregorian(jdn: number): Date {
    const e = 4 * (jdn + 1401 + Math.floor(Math.floor((4 * jdn + 274277) / 146097) * 3 / 4) - 38) + 3;
    const h = 5 * Math.floor((e % 1461 + 1461) % 1461 / 4) + 2;
    const day = Math.floor((h % 153 + 153) % 153 / 5) + 1;
    const month = (Math.floor(h / 153) + 2) % 12 + 1;
    const year = Math.floor(e / 1461) - 4716 + Math.floor((14 - month) / 12);
    return new Date(year, month - 1, day);
}

export function jdnFrench(jdn: number): FrenchDate {
    let lo = 0;
    let hi = leaps.length;

    while (lo + 1 < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (startJD + 365 * mid + leaps[mid] <= jdn)
            lo = mid;
        else
            hi = mid;
    }

    const dd = jdn - (startJD + 365 * lo + leaps[lo]);
    return {
        year: startYear + lo,
        month: Math.floor(dd / 30) + 1 as Month,
        day: dd % 30 + 1 as Day,
    }
}

export function jdnLongCount(jdn: number): string | null {
    let z = jdn - 584283;
    if (z < 0)
        return null;

    const parts = [z % 20, Math.floor(z / 20) % 18];
    z = Math.floor(z / 360);
    while (z > 0) {
        parts.push(z % 20);
        z = Math.floor(z / 20);
    }

    while (parts.length < 5) {
        parts.push(0);
    }

    return parts.reverse().join('.');
}

export function monthName(month: Month): string {
    return monthNames[month];
}

export function dateName(month: Month, day: Day): string | null {
    if (month === 13) {
        switch (day) {
            case 1:
                return 'La Fête de la Vertu';
            case 2:
                return 'La Fête du Génie';
            case 3:
                return 'La Fête du Travail';
            case 4:
                return "La Fête de l'Opinion";
            case 5:
                return 'La Fête des Récompenses';
            case 6:
                return 'La Fête de la Révolution';
            default:
                return null;
        }
    }
    return `${day} ${monthNames[month]}`;
}
