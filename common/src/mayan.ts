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
