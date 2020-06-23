import { CalendarItem } from './CalendarItem';
import { endOfDay, isAfter, isBefore, isSameDay, lastDayOfMonth, setDate, startOfDay, startOfMonth } from 'date-fns';
import React, { useMemo } from 'react';

type Props = {
  value: Date;

  /**
   * 表示したい月
   *
   * 「日」部分以降は無視される
   * e.g. 2020-02-27T12:44 -> 2020-02-01T00:00
   */
  page: Date;

  /**
   * 選択可能な最大の「日」
   *
   * 「時間」部分以降は無視される
   * e.g. 2020-02-27T12:44 -> 2020-02-27T23:59
   */
  maxDate?: Date;

  /**
   * 選択可能な最小の「日」
   *
   * 「時間」部分以降は無視される
   * e.g. 2020-02-27T12:44 -> 2020-02-27T00:00
   */
  minDate?: Date;

  onClickDate?: (date: Date) => void;
};

export const Calendar = ({ value, page: rawPage, maxDate: rawMaxDate, minDate: rawMinDate, onClickDate }: Props) => {
  const page = useMemo(() => startOfMonth(rawPage), [rawPage]);

  const maxDate = useMemo(() => rawMaxDate && endOfDay(rawMaxDate), [rawMaxDate]);

  const minDate = useMemo(() => rawMinDate && startOfDay(rawMinDate), [rawMinDate]);

  const handleClickDate = (value: Date) => onClickDate?.(startOfDay(value));

  return (
    <table>
      <thead>
        <tr>
          {WeekLabels.map(label => (
            <th key={label}>{label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {getDateArray(page).map((week, i) => (
          <tr key={i}>
            {week.map((cell, j) => (
              <CalendarItem
                key={j}
                value={cell}
                isActive={cell && isSameDay(cell, value)}
                isDisabled={cell && ((maxDate && isAfter(cell, maxDate)) || (minDate && isBefore(cell, minDate)))}
                onClick={handleClickDate}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const WeekLabels = ['日', '月', '火', '水', '木', '金', '土'] as const;

/**
 * @example
 * [
 *   [undefined, undefined, undefined, 1/01, 1/02, 1/03, 1/04],
 *   [1/05,      1/06,      1/07,      1/08, 1/09, 1/10, 1/11],
 *   ...
 *   [1/26,      1/27,      1/28,      1/29, 1/30, 1/31, undefined],
 * ]
 */
function getDateArray(page: Date): (Date | undefined)[][] {
  const padStart = [...Array(setDate(page, 1).getDay())].fill(undefined);

  const dates = [...Array(lastDayOfMonth(page).getDate()).keys()].map(i => setDate(page, i + 1));

  const headLength = (padStart.length + dates.length) % 7 || 7;

  const padEnd = [...Array(7 - headLength)].fill(undefined);

  return splitChunk<Date | undefined>([...padStart, ...dates, ...padEnd], 7);
}

function splitChunk<T>(array: T[], size: number) {
  return array.reduce((acc, _, i) => (i % size ? acc : [...acc, array.slice(i, i + size)]), [] as T[][]);
}
