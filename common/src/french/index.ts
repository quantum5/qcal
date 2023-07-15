import data from './cal.json';
import ruralName from './rural-days.json';

// Month 13 is for the complementary days
export type FrenchMonth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
export type FrenchDay =
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
    month: FrenchMonth,
    day: FrenchDay,
};

const monthNames: { [key in FrenchMonth]: string } = {
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

export const frStartJD = data.start_jd;
export const frStartYear = data.start_year;
const leaps: Array<number> = [0];

let leapFromStart = 0;
data.leap.forEach(leap => {
    leapFromStart += leap;
    leaps.push(leapFromStart);

});

export const frEndYear = frStartYear + leaps.length - 1;

export function frSupportedYear(year: number): boolean {
    return frStartYear <= year && year <= frEndYear;
}

export function frJDN(year: number, month: FrenchMonth, day: FrenchDay): number {
    const dy = year - frStartYear;
    const dd = month * 30 + day - 31;
    return frStartJD + 365 * dy + leaps[dy] + dd;
}

export function frIsLeap(year: number): boolean {
    return !!data.leap[year - frStartYear];
}

export const frEndJD = frJDN(frEndYear, 13, frIsLeap(frEndYear) ? 6 : 5);

export function jdnFrench(jdn: number): FrenchDate {
    let lo = 0;
    let hi = leaps.length;

    while (lo + 1 < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (frStartJD + 365 * mid + leaps[mid] <= jdn)
            lo = mid;
        else
            hi = mid;
    }

    const dd = jdn - (frStartJD + 365 * lo + leaps[lo]);
    return {
        year: frStartYear + lo,
        month: Math.floor(dd / 30) + 1 as FrenchMonth,
        day: dd % 30 + 1 as FrenchDay,
    };
}

export function monthName(month: FrenchMonth): string {
    return monthNames[month];
}

export function dateName(month: FrenchMonth, day: FrenchDay): string | null {
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

export function dateRuralName(month: FrenchMonth, day: FrenchDay): { name: string, title: string } | null {
    const rural = ruralName[month * 30 + day - 31];
    if (!rural)
        return null;
    const [name, title] = rural;
    return {name, title};
}

export function frDateFormat({year, month, day}: { year: number, month: FrenchMonth, day: FrenchDay }): string {
    return `${dateName(month, day)} ${year}`;
}
