import json
import os
import traceback
from functools import cached_property
from multiprocessing import Pool

from skyfield.almanac import seasons
from skyfield.api import load
from skyfield.jpllib import SpiceKernel
from skyfield.searchlib import find_discrete
from skyfield.timelib import Time, julian_day

DE441_PART_1 = 'https://naif.jpl.nasa.gov/pub/naif/generic_kernels/spk/planets/de441_part-1.bsp'
DE441_PART_2 = 'https://naif.jpl.nasa.gov/pub/naif/generic_kernels/spk/planets/de441_part-2.bsp'
ts = load.timescale()

YEAR_RANGE = range(-13200, 17191)


class SeasonEphemeris:
    @cached_property
    def _de440(self) -> SpiceKernel:
        return load('de440.bsp')

    @cached_property
    def _de441a(self) -> SpiceKernel:
        return load(DE441_PART_1)

    @cached_property
    def _de441b(self) -> SpiceKernel:
        return load(DE441_PART_2)

    # noinspection PyStatementEffect
    def initialize(self):
        self._de440
        self._de441a
        self._de441b

    def __getstate__(self):
        state = self.__dict__.copy()
        state.pop('_de440', None)
        state.pop('_de441a', None)
        state.pop('_de441b', None)
        return state

    def __setstate__(self, state):
        self.__dict__.update(state)

    def _eph_for(self, year: int) -> SpiceKernel:
        if 1550 < year < 2650:
            return self._de440
        elif year < 1969:
            return self._de441a
        else:
            return self._de441b

    def autumnal_equinox(self, year: int) -> Time:
        try:
            t, _ = find_discrete(ts.utc(year, 9, 1), ts.utc(year, 9, 31), seasons(self._eph_for(year)))
            return t[0]
        except Exception:
            traceback.print_exc()
            raise


def paris_jdn(t: Time) -> int:
    y, mo, d, h, m, s = t.ut1_calendar()
    ds = h * 3600 + m * 60 + int(round(s)) + 561
    return int(julian_day(y, mo, d) + ds // 86400)


def fr_year(gregorian_year: int) -> int:
    return gregorian_year - 1791


def main():
    ephemeris = SeasonEphemeris()
    pool = Pool(os.cpu_count())
    equinoxes = pool.map(ephemeris.autumnal_equinox, YEAR_RANGE)

    result = {
        'start_jd': paris_jdn(equinoxes[0]),
        'start_year': fr_year(int(equinoxes[0].ut1_calendar()[0])),
        'leap': [int(paris_jdn(b) - paris_jdn(a) == 366) for a, b in zip(equinoxes, equinoxes[1:])]
    }
    with open('src/french/cal.json', 'w') as f:
        json.dump(result, f, separators=(',', ':'))


if __name__ == '__main__':
    main()
