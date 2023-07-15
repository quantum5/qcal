import {act, render} from '@testing-library/react';
import {DayChanger} from './DayChanger';

describe('Timezones', () => {
    it('should always be UTC', () => {
        expect(new Date().getTimezoneOffset()).toBe(0);
    });
});

describe('DayChanger', () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.clearAllMocks());

    it('switches dates', () => {
        const start = new Date('2023-04-22T17:16:00');
        const end = new Date('2023-04-23T00:00:00');
        const spy = jest
            .spyOn(global, 'Date')
            // @ts-ignore we are mocking the constructor but TypeScript thinks we are mocking the function
            .mockImplementation(() => start);

        const onChange = jest.fn();
        render(<DayChanger onDateChange={onChange}/>);

        act(() => {
            jest.advanceTimersByTime(24_239_999);
            expect(onChange).not.toHaveBeenCalled();

            // @ts-ignore we are mocking the constructor but TypeScript thinks we are mocking the function
            spy.mockImplementationOnce(() => end);

            jest.advanceTimersByTime(1);
            expect(onChange).toHaveBeenCalledWith(2460058);
        });
    });
});
