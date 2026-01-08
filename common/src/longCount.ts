export type LongCount = Array<number>;

export function jdnLongCount(jdn: number): LongCount | null {
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

    return parts.reverse();
}

export function longCountJDN(longCount: LongCount): number {
    const state = [...longCount];
    const last = (state.pop() ?? 0) + (state.pop() ?? 0) * 20;
    let sum = 0;
    state.forEach((value) => sum = sum * 20 + value);
    return sum * 360 + last + 584283;
}
