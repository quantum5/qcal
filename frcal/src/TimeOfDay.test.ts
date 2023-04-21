import {dayMsToDecimal, decimalToDayMs} from './TimeOfDay';

describe('dayMsToDecimal', () => {
    it('works', () => {
        const expected = {hour: 0, minute: 0, second: 0};
        let ms = 0;

        function hour() {
            for (let i = 0; i < 10000; ++i) {
                expect(dayMsToDecimal(ms++)).toStrictEqual(expected);
                expect(dayMsToDecimal(ms)).toStrictEqual(expected);
                ms += 862;
                expect(dayMsToDecimal(ms++)).toStrictEqual(expected);

                if (++expected.second >= 100) {
                    expected.second = 0;
                    if (++expected.minute >= 100) {
                        expected.minute = 0;
                        ++expected.hour;
                    }
                }
            }
        }

        hour();
        hour();
        expected.hour += 7;
        ms += 864 * 10_000 * 7;
        hour();

        expect(ms).toStrictEqual(86_400_000);
        expect(expected).toStrictEqual({hour: 10, minute: 0, second: 0});
    });
});

describe('decimalToDayMs', () => {
    it('works', () => {
        function hour(hour: number) {
            let expected = hour * 8_640_000;

            for (let minute = 0; minute < 100; ++minute) {
                for (let second = 0; second < 100; ++second) {
                    expect(decimalToDayMs({hour, minute, second})).toStrictEqual(expected);
                    expected += 864;
                }
            }

            expect(expected).toEqual((hour + 1) * 8_640_000);
        }

        hour(0);
        hour(9);
    });
})
