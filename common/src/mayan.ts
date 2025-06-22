export enum TzolkinName {
  IMIX,
  IK,
  AKBAL,
  KAN,
  CHIKCHAN,
  KIMI,
  MANIK,
  LAMAT,
  MULUK,
  OK,
  CHUWEN,
  EB,
  BEN,
  IX,
  MEN,
  KIB,
  KABAN,
  ETZNAB,
  KAWAK,
  AJAW
}

export type TzolkinNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

export type Tzolkin = {
  number: TzolkinNumber,
  name: TzolkinName,
};

const tzolkinNames: Record<TzolkinName, string> = {
  [TzolkinName.IMIX]: 'Imix',
  [TzolkinName.IK]: 'Ikʼ',
  [TzolkinName.AKBAL]: 'Akʼbʼal',
  [TzolkinName.KAN]: 'Kʼan',
  [TzolkinName.CHIKCHAN]: 'Chikchan',
  [TzolkinName.KIMI]: 'Kimi',
  [TzolkinName.MANIK]: 'Manikʼ',
  [TzolkinName.LAMAT]: 'Lamat',
  [TzolkinName.MULUK]: 'Muluk',
  [TzolkinName.OK]: 'Ok',
  [TzolkinName.CHUWEN]: 'Chuwen',
  [TzolkinName.EB]: 'Ebʼ',
  [TzolkinName.BEN]: 'Bʼen',
  [TzolkinName.IX]: 'Ix',
  [TzolkinName.MEN]: 'Men',
  [TzolkinName.KIB]: 'Kibʼ',
  [TzolkinName.KABAN]: 'Kabʼan',
  [TzolkinName.ETZNAB]: 'Etzʼnabʼ',
  [TzolkinName.KAWAK]: 'Kawak',
  [TzolkinName.AJAW]: 'Ajaw',
};

export function tzolkinName(name: TzolkinName): string {
  return tzolkinNames[name];
}

export function formatTzolkin(tzolkin: Tzolkin): string {
  return `${tzolkin.number} ${tzolkinName(tzolkin.name)}`;
}

export function jdnTzolkin(jdn: number): Tzolkin {
  return {
    number: ((jdn % 13 + 18) % 13 + 1) as TzolkinNumber,
    name: (jdn % 20 + 36) % 20,
  };
}

export type HaabMonth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19;
export type HaabDay = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19;

const haabNames: Record<HaabMonth, string> = {
  1: 'Pop',
  2: 'Woʼ',
  3: 'Sip',
  4: 'Sotzʼ',
  5: 'Sek',
  6: 'Xul',
  7: 'Yaxkʼin',
  8: 'Mol',
  9: 'Chʼen',
  10: 'Yax',
  11: 'Sakʼ',
  12: 'Keh',
  13: 'Mak',
  14: 'Kʼankʼin',
  15: 'Muwan',
  16: 'Pax',
  17: 'Kʼayabʼ',
  18: 'Kumkʼu',
  19: 'Wayebʼ',
};

export function formatHaab(month: HaabMonth, day: HaabDay): string {
  return `${day} ${haabNames[month]}`;
}
