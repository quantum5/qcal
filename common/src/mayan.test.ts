import {TzolkinName, tzolkinName, formatTzolkin} from './mayan';

describe('tzolkinName', () => {
  it('should return correct name for IMIX', () => {
    expect(tzolkinName(TzolkinName.IMIX)).toBe('Imix');
  });

  it('should return correct name for IK', () => {
    expect(tzolkinName(TzolkinName.IK)).toBe('Ikʼ');
  });

  it('should return correct name for AJAW', () => {
    expect(tzolkinName(TzolkinName.AJAW)).toBe('Ajaw');
  });
});

describe('formatTzolkin', () => {
  it('should format tzolkin with number 1 and IMIX', () => {
    expect(formatTzolkin({number: 1, name: TzolkinName.IMIX})).toBe('1 Imix');
  });

  it('should format tzolkin with number 13 and AJAW', () => {
    expect(formatTzolkin({number: 13, name: TzolkinName.AJAW})).toBe('13 Ajaw');
  });

  it('should format tzolkin with number 7 and KABAN', () => {
    expect(formatTzolkin({number: 7, name: TzolkinName.KABAN})).toBe('7 Kabʼan');
  });
});
