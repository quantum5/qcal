import {formatHaab, formatTzolkin, jdnHaab, jdnTzolkin, TzolkinName, tzolkinName} from './mayan';

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

describe('jdnTzolkin', () => {
    it('converts sample consecutive dates in June 2025 correctly', () => {
        expect(jdnTzolkin(2460828)).toEqual({number: 12, name: TzolkinName.CHIKCHAN});
        expect(jdnTzolkin(2460829)).toEqual({number: 13, name: TzolkinName.KIMI});
        expect(jdnTzolkin(2460830)).toEqual({number: 1, name: TzolkinName.MANIK});
        expect(jdnTzolkin(2460831)).toEqual({number: 2, name: TzolkinName.LAMAT});
        expect(jdnTzolkin(2460832)).toEqual({number: 3, name: TzolkinName.MULUK});
        expect(jdnTzolkin(2460833)).toEqual({number: 4, name: TzolkinName.OK});
        expect(jdnTzolkin(2460834)).toEqual({number: 5, name: TzolkinName.CHUWEN});
        expect(jdnTzolkin(2460835)).toEqual({number: 6, name: TzolkinName.EB});
        expect(jdnTzolkin(2460836)).toEqual({number: 7, name: TzolkinName.BEN});
        expect(jdnTzolkin(2460837)).toEqual({number: 8, name: TzolkinName.IX});
        expect(jdnTzolkin(2460838)).toEqual({number: 9, name: TzolkinName.MEN});
        expect(jdnTzolkin(2460839)).toEqual({number: 10, name: TzolkinName.KIB});
        expect(jdnTzolkin(2460840)).toEqual({number: 11, name: TzolkinName.KABAN});
        expect(jdnTzolkin(2460841)).toEqual({number: 12, name: TzolkinName.ETZNAB});
        expect(jdnTzolkin(2460842)).toEqual({number: 13, name: TzolkinName.KAWAK});
        expect(jdnTzolkin(2460843)).toEqual({number: 1, name: TzolkinName.AJAW});
        expect(jdnTzolkin(2460844)).toEqual({number: 2, name: TzolkinName.IMIX});
        expect(jdnTzolkin(2460845)).toEqual({number: 3, name: TzolkinName.IK});
        expect(jdnTzolkin(2460846)).toEqual({number: 4, name: TzolkinName.AKBAL});
        expect(jdnTzolkin(2460847)).toEqual({number: 5, name: TzolkinName.KAN});
        expect(jdnTzolkin(2460848)).toEqual({number: 6, name: TzolkinName.CHIKCHAN});
        expect(jdnTzolkin(2460849)).toEqual({number: 7, name: TzolkinName.KIMI});
        expect(jdnTzolkin(2460850)).toEqual({number: 8, name: TzolkinName.MANIK});
        expect(jdnTzolkin(2460851)).toEqual({number: 9, name: TzolkinName.LAMAT});
        expect(jdnTzolkin(2460852)).toEqual({number: 10, name: TzolkinName.MULUK});
        expect(jdnTzolkin(2460853)).toEqual({number: 11, name: TzolkinName.OK});
        expect(jdnTzolkin(2460854)).toEqual({number: 12, name: TzolkinName.CHUWEN});
        expect(jdnTzolkin(2460855)).toEqual({number: 13, name: TzolkinName.EB});
        expect(jdnTzolkin(2460856)).toEqual({number: 1, name: TzolkinName.BEN});
        expect(jdnTzolkin(2460857)).toEqual({number: 2, name: TzolkinName.IX});
    });

    it('converts sample dates from history correctly', () => {
        expect(jdnTzolkin(584283)).toEqual({number: 4, name: TzolkinName.AJAW}); // Mayan creation
        expect(jdnTzolkin(1705426)).toEqual({number: 1, name: TzolkinName.AKBAL}); // Ides of March
        expect(jdnTzolkin(2266296)).toEqual({number: 12, name: TzolkinName.BEN}); // Columbus reaches the Americas
        expect(jdnTzolkin(2430336)).toEqual({number: 5, name: TzolkinName.BEN}); // a date which will live in infamy
        expect(jdnTzolkin(2440423)).toEqual({number: 4, name: TzolkinName.AJAW}); // Moon landing
        expect(jdnTzolkin(2458920)).toEqual({number: 2, name: TzolkinName.KABAN}); // COVID-19 pandemic
    });

    it('handles negative JDN correctly', () => {
        expect(jdnTzolkin(-1)).toEqual({number: 5, name: TzolkinName.KIB});
        expect(jdnTzolkin(-10)).toEqual({number: 9, name: TzolkinName.MANIK});
        expect(jdnTzolkin(-100)).toEqual({number: 10, name: TzolkinName.KABAN});
        expect(jdnTzolkin(-1000)).toEqual({number: 7, name: TzolkinName.KABAN});
    });

    it('completes a full Tzolkin cycle across JD0', () => {
        const results = new Set();

        for (let i = -130; i < 130; i++) {
            results.add(formatTzolkin(jdnTzolkin(i)));
        }

        // Should have 260 unique combinations
        expect(results.size).toBe(260);
    });
});

describe('formatHaab', () => {
    it('formats normal month and day', () => {
        expect(formatHaab({month: 1, day: 5})).toBe('5 Pop');
        expect(formatHaab({month: 7, day: 12})).toBe('12 Yaxkʼin');
    });

    it('formats Wayeb month', () => {
        expect(formatHaab({month: 19, day: 4})).toBe('4 Wayebʼ');
    });

    it('formats zero day', () => {
        expect(formatHaab({month: 3, day: 0})).toBe('0 Sip');
    });
});

describe('jdnHaab', () => {
    it('converts sample consecutive dates in June 2025 correctly', () => {
        expect(jdnHaab(2460828)).toEqual({month: 4, day: 3});
        expect(jdnHaab(2460829)).toEqual({month: 4, day: 4});
        expect(jdnHaab(2460830)).toEqual({month: 4, day: 5});
        expect(jdnHaab(2460831)).toEqual({month: 4, day: 6});
        expect(jdnHaab(2460832)).toEqual({month: 4, day: 7});
        expect(jdnHaab(2460833)).toEqual({month: 4, day: 8});
        expect(jdnHaab(2460834)).toEqual({month: 4, day: 9});
        expect(jdnHaab(2460835)).toEqual({month: 4, day: 10});
        expect(jdnHaab(2460836)).toEqual({month: 4, day: 11});
        expect(jdnHaab(2460837)).toEqual({month: 4, day: 12});
        expect(jdnHaab(2460838)).toEqual({month: 4, day: 13});
        expect(jdnHaab(2460839)).toEqual({month: 4, day: 14});
        expect(jdnHaab(2460840)).toEqual({month: 4, day: 15});
        expect(jdnHaab(2460841)).toEqual({month: 4, day: 16});
        expect(jdnHaab(2460842)).toEqual({month: 4, day: 17});
        expect(jdnHaab(2460843)).toEqual({month: 4, day: 18});
        expect(jdnHaab(2460844)).toEqual({month: 4, day: 19});
        expect(jdnHaab(2460845)).toEqual({month: 5, day: 0});
        expect(jdnHaab(2460846)).toEqual({month: 5, day: 1});
        expect(jdnHaab(2460847)).toEqual({month: 5, day: 2});
        expect(jdnHaab(2460848)).toEqual({month: 5, day: 3});
        expect(jdnHaab(2460849)).toEqual({month: 5, day: 4});
        expect(jdnHaab(2460850)).toEqual({month: 5, day: 5});
        expect(jdnHaab(2460851)).toEqual({month: 5, day: 6});
        expect(jdnHaab(2460852)).toEqual({month: 5, day: 7});
        expect(jdnHaab(2460853)).toEqual({month: 5, day: 8});
        expect(jdnHaab(2460854)).toEqual({month: 5, day: 9});
        expect(jdnHaab(2460855)).toEqual({month: 5, day: 10});
        expect(jdnHaab(2460856)).toEqual({month: 5, day: 11});
        expect(jdnHaab(2460857)).toEqual({month: 5, day: 12});
    });

    it('converts sample dates from history correctly', () => {
        expect(jdnHaab(584283)).toEqual({month: 18, day: 8}); // Mayan creation
        expect(jdnHaab(1705426)).toEqual({month: 11, day: 11}); // Ides of March
        expect(jdnHaab(2266296)).toEqual({month: 4, day: 16}); // Columbus reaches the Americas
        expect(jdnHaab(2430336)).toEqual({month: 12, day: 11}); // a date which will live in infamy
        expect(jdnHaab(2440423)).toEqual({month: 5, day: 18}); // Moon landing
        expect(jdnHaab(2458920)).toEqual({month: 18, day: 5}); // COVID-19 pandemic
    });

    it('handles negative JDN correctly', () => {
        expect(jdnHaab(-365)).toEqual({month: 4, day: 5});
        expect(jdnHaab(-1)).toEqual({month: 4, day: 4});
    });
});
