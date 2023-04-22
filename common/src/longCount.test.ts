import {jdnLongCount} from './longCount';

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
})
