import { formatDateTime } from './format-date';

describe('format-date', () => {
    test("Should keep original timezone", () => {
        expect(formatDateTime('2020-11-21T09:17:00-08:00', true)).toBe("November 21, 2020, 9:17:00 AM GMT-8");
    });

    test("Should display in user's timezone", () => {
        expect(formatDateTime('2020-11-21T09:17:00-08:00')).toBe("November 21, 2020, 5:17:00 PM GMT");
    });
});