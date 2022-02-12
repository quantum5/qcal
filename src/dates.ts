import data from '../cal.json';

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

export function monthName(month: Month): string {
    return monthNames[month];
}

export function dateName(month: Month, day: Day): string | null {
    if (month === 13) {
        switch (day) {
            case 1: return 'La Fête de la Vertu';
            case 2: return 'La Fête du Génie';
            case 3: return 'La Fête du Travail';
            case 4: return "La Fête de l'Opinion";
            case 5: return 'La Fête des Récompenses';
            case 6: return 'La Fête de la Révolution';
            default: return null;
        }
    }
    return `${day} ${monthNames[month]}`;
}
