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
