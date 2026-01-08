import {jdnLongCount, longCountJDN} from './longCount';

describe('jdnLongCount', () => {
    it('works for normal dates', () => {
        expect(jdnLongCount(2456282)).toEqual([12, 19, 19, 17, 19]);
        expect(jdnLongCount(2459413)).toEqual([13, 0, 8, 12, 10]);
        expect(jdnLongCount(1708616)).toEqual([7, 16, 3, 2, 13]);
        expect(jdnLongCount(1787816)).toEqual([8, 7, 3, 2, 13]);
        expect(jdnLongCount(1709981)).toEqual([7, 16, 6, 16, 18]);
        expect(jdnLongCount(1725275)).toEqual([7, 18, 9, 7, 12]);
        expect(jdnLongCount(1727095)).toEqual([7, 18, 14, 8, 12]);
        expect(jdnLongCount(1731775)).toEqual([7, 19, 7, 8, 12]);
        expect(jdnLongCount(1734635)).toEqual([7, 19, 15, 7, 12]);
        expect(jdnLongCount(1751618)).toEqual([8, 2, 2, 10, 15]);
        expect(jdnLongCount(1758818)).toEqual([8, 3, 2, 10, 15]);
        expect(jdnLongCount(1767234)).toEqual([8, 4, 5, 17, 11]);
        expect(jdnLongCount(1773428)).toEqual([8, 5, 3, 3, 5]);
        expect(jdnLongCount(1778230)).toEqual([8, 5, 16, 9, 7]);
        expect(jdnLongCount(1780300)).toEqual([8, 6, 2, 4, 17]);
        expect(jdnLongCount(2283483)).toEqual([11, 16, 0, 0, 0]);
        expect(jdnLongCount(584283)).toEqual([0, 0, 0, 0, 0]);
        expect(jdnLongCount(728283)).toEqual([1, 0, 0, 0, 0]);
        expect(jdnLongCount(872283)).toEqual([2, 0, 0, 0, 0]);
        expect(jdnLongCount(1016283)).toEqual([3, 0, 0, 0, 0]);
        expect(jdnLongCount(1160283)).toEqual([4, 0, 0, 0, 0]);
        expect(jdnLongCount(1304283)).toEqual([5, 0, 0, 0, 0]);
        expect(jdnLongCount(1448283)).toEqual([6, 0, 0, 0, 0]);
        expect(jdnLongCount(1592283)).toEqual([7, 0, 0, 0, 0]);
        expect(jdnLongCount(1736283)).toEqual([8, 0, 0, 0, 0]);
        expect(jdnLongCount(1880283)).toEqual([9, 0, 0, 0, 0]);
        expect(jdnLongCount(2024283)).toEqual([10, 0, 0, 0, 0]);
        expect(jdnLongCount(2168283)).toEqual([11, 0, 0, 0, 0]);
        expect(jdnLongCount(2312283)).toEqual([12, 0, 0, 0, 0]);
        expect(jdnLongCount(2456283)).toEqual([13, 0, 0, 0, 0]);
        expect(jdnLongCount(2600283)).toEqual([14, 0, 0, 0, 0]);
        expect(jdnLongCount(2744283)).toEqual([15, 0, 0, 0, 0]);
        expect(jdnLongCount(2888283)).toEqual([16, 0, 0, 0, 0]);
        expect(jdnLongCount(3032283)).toEqual([17, 0, 0, 0, 0]);
        expect(jdnLongCount(3176283)).toEqual([18, 0, 0, 0, 0]);
        expect(jdnLongCount(3320283)).toEqual([19, 0, 0, 0, 0]);
        expect(jdnLongCount(3464283)).toEqual([1, 0, 0, 0, 0, 0]);
        expect(jdnLongCount(1941383)).toEqual([9, 8, 9, 13, 0]);
    });

    it('works for insane dates in the future', () => {
        expect(jdnLongCount(591279564516)).toEqual([1, 5, 13, 5, 5, 4, 0, 11, 13, 13]);
        expect(jdnLongCount(570988471138)).toEqual([1, 4, 15, 12, 19, 13, 13, 3, 8, 15]);
        expect(jdnLongCount(166410754861)).toEqual([7, 4, 9, 1, 6, 3, 13, 14, 18]);
        expect(jdnLongCount(176632006419)).toEqual([7, 13, 6, 10, 7, 1, 19, 4, 16]);
        expect(jdnLongCount(652557304645)).toEqual([1, 8, 6, 9, 2, 3, 17, 16, 10, 2]);
        expect(jdnLongCount(140305417242)).toEqual([6, 1, 15, 16, 19, 2, 7, 1, 19]);
        expect(jdnLongCount(805888002058)).toEqual([1, 14, 19, 11, 2, 0, 8, 0, 8, 15]);
        expect(jdnLongCount(176433890202)).toEqual([7, 13, 3, 1, 11, 5, 16, 7, 19]);
        expect(jdnLongCount(331888546361)).toEqual([14, 8, 1, 18, 17, 10, 5, 13, 18]);
        expect(jdnLongCount(657363764536)).toEqual([1, 8, 10, 12, 11, 2, 1, 14, 0, 13]);
    });

    it('returns null for dates before inception of calendar', () => {
        expect(jdnLongCount(0)).toBeNull();
        expect(jdnLongCount(584282)).toBeNull();
    });
});

describe('longCountJDN', () => {
    it('works for normal dates', () => {
        expect(longCountJDN([12, 19, 19, 17, 19])).toEqual(2456282);
        expect(longCountJDN([13, 0, 8, 12, 10])).toEqual(2459413);
        expect(longCountJDN([7, 16, 3, 2, 13])).toEqual(1708616);
        expect(longCountJDN([8, 7, 3, 2, 13])).toEqual(1787816);
        expect(longCountJDN([7, 16, 6, 16, 18])).toEqual(1709981);
        expect(longCountJDN([7, 18, 9, 7, 12])).toEqual(1725275);
        expect(longCountJDN([7, 18, 14, 8, 12])).toEqual(1727095);
        expect(longCountJDN([7, 19, 7, 8, 12])).toEqual(1731775);
        expect(longCountJDN([7, 19, 15, 7, 12])).toEqual(1734635);
        expect(longCountJDN([8, 2, 2, 10, 15])).toEqual(1751618);
        expect(longCountJDN([8, 3, 2, 10, 15])).toEqual(1758818);
        expect(longCountJDN([8, 4, 5, 17, 11])).toEqual(1767234);
        expect(longCountJDN([8, 5, 3, 3, 5])).toEqual(1773428);
        expect(longCountJDN([8, 5, 16, 9, 7])).toEqual(1778230);
        expect(longCountJDN([8, 6, 2, 4, 17])).toEqual(1780300);
        expect(longCountJDN([11, 16, 0, 0, 0])).toEqual(2283483);
        expect(longCountJDN([0, 0, 0, 0, 0])).toEqual(584283);
        expect(longCountJDN([1, 0, 0, 0, 0])).toEqual(728283);
        expect(longCountJDN([2, 0, 0, 0, 0])).toEqual(872283);
        expect(longCountJDN([3, 0, 0, 0, 0])).toEqual(1016283);
        expect(longCountJDN([4, 0, 0, 0, 0])).toEqual(1160283);
        expect(longCountJDN([5, 0, 0, 0, 0])).toEqual(1304283);
        expect(longCountJDN([6, 0, 0, 0, 0])).toEqual(1448283);
        expect(longCountJDN([7, 0, 0, 0, 0])).toEqual(1592283);
        expect(longCountJDN([8, 0, 0, 0, 0])).toEqual(1736283);
        expect(longCountJDN([9, 0, 0, 0, 0])).toEqual(1880283);
        expect(longCountJDN([10, 0, 0, 0, 0])).toEqual(2024283);
        expect(longCountJDN([11, 0, 0, 0, 0])).toEqual(2168283);
        expect(longCountJDN([12, 0, 0, 0, 0])).toEqual(2312283);
        expect(longCountJDN([13, 0, 0, 0, 0])).toEqual(2456283);
        expect(longCountJDN([14, 0, 0, 0, 0])).toEqual(2600283);
        expect(longCountJDN([15, 0, 0, 0, 0])).toEqual(2744283);
        expect(longCountJDN([16, 0, 0, 0, 0])).toEqual(2888283);
        expect(longCountJDN([17, 0, 0, 0, 0])).toEqual(3032283);
        expect(longCountJDN([18, 0, 0, 0, 0])).toEqual(3176283);
        expect(longCountJDN([19, 0, 0, 0, 0])).toEqual(3320283);
        expect(longCountJDN([1, 0, 0, 0, 0, 0])).toEqual(3464283);
        expect(longCountJDN([9, 8, 9, 13, 0])).toEqual(1941383);
    });

    it('works for insane dates in the future', () => {
        expect(longCountJDN([1, 5, 13, 5, 5, 4, 0, 11, 13, 13])).toEqual(591279564516);
        expect(longCountJDN([1, 4, 15, 12, 19, 13, 13, 3, 8, 15])).toEqual(570988471138);
        expect(longCountJDN([7, 4, 9, 1, 6, 3, 13, 14, 18])).toEqual(166410754861);
        expect(longCountJDN([7, 13, 6, 10, 7, 1, 19, 4, 16])).toEqual(176632006419);
        expect(longCountJDN([1, 8, 6, 9, 2, 3, 17, 16, 10, 2])).toEqual(652557304645);
        expect(longCountJDN([6, 1, 15, 16, 19, 2, 7, 1, 19])).toEqual(140305417242);
        expect(longCountJDN([1, 14, 19, 11, 2, 0, 8, 0, 8, 15])).toEqual(805888002058);
        expect(longCountJDN([7, 13, 3, 1, 11, 5, 16, 7, 19])).toEqual(176433890202);
        expect(longCountJDN([14, 8, 1, 18, 17, 10, 5, 13, 18])).toEqual(331888546361);
        expect(longCountJDN([1, 8, 10, 12, 11, 2, 1, 14, 0, 13])).toEqual(657363764536);
    });
});
