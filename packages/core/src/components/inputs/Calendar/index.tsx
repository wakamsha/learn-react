import { css } from '@emotion/css';
import { addMonth, dayEnd, dayStart, format, isAfter, isBefore, monthEnd, monthStart, sameDay } from '@formkit/tempo';
import { type ChangeEvent } from 'react';
import { FontSize } from '../../../constants/Style';
import { cssVar, gutter } from '../../../helpers/Style';
import { IconButton } from '../IconButton';
import { Item } from './Item';

type Props = {
  value: Date;
  /**
   * 表示したい月。
   *
   * 「日」部分以降は無視される。
   * e.g. 2020-02-27T12:44 -> 2020-02-01T00:00
   */
  page: Date;
  /**
   * 選択可能な最大の「日」。
   *
   * 「時間」部分以降は無視される。
   * e.g. 2020-02-27T12:44 -> 2020-02-27T23:59
   */
  maxDate?: Date;
  /**
   * 選択可能な最小の「日」。
   *
   * 「時間」部分以降は無視される。
   * e.g. 2020-02-27T12:44 -> 2020-02-27T00:00
   */
  minDate?: Date;
  onChangeDate?: (date: Date) => void;
  onChangeMonth?: (date: Date) => void;
};

/**
 * カレンダーには 1 か月以上の日のグリッドが表示され、ユーザーは単一の日付を選択できます。
 */
export const Calendar = ({
  value,
  page: rawPage,
  maxDate: rawMaxDate,
  minDate: rawMinDate,
  onChangeDate,
  onChangeMonth,
}: Props) => {
  const page = monthStart(rawPage);

  const maxDate = rawMaxDate && dayEnd(rawMaxDate);

  const minDate = rawMinDate && dayStart(rawMinDate);

  const handleClickDate = (value: Date) => {
    onChangeDate?.(dayStart(value));
  };

  const handleClickPreviousMonth = () => {
    onChangeMonth?.(addMonth(page, -1));
  };

  const handleClickNextMonth = () => {
    onChangeMonth?.(addMonth(page, 1));
  };

  const handleChangeYearMonth = (event: ChangeEvent<HTMLSelectElement>) => {
    onChangeMonth?.(new Date(options[event.target.selectedIndex]));
  };

  return (
    <div>
      <div role="menubar" className={styleMenubar}>
        <IconButton name="angle-left" variant="bare" ariaLabel="Preview month" onClick={handleClickPreviousMonth} />
        <select name="month year" value={page.getTime()} onChange={handleChangeYearMonth}>
          {yearGroup.map((group) => (
            <optgroup key={group.year} label={`${group.year}`}>
              {group.months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <IconButton name="angle-right" variant="bare" ariaLabel="Next month" onClick={handleClickNextMonth} />
      </div>
      <table className={styleCalendar}>
        <thead>
          <tr>
            {WeekLabels.map((label) => (
              <th key={label}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {getDateArray(page).map((week, i) => (
            <tr key={i}>
              {week.map((cell, j) => (
                <td key={j}>
                  <Item
                    value={cell}
                    active={cell ? sameDay(cell, value) : undefined}
                    disabled={
                      cell ? ((maxDate && isAfter(cell, maxDate)) ?? (minDate && isBefore(cell, minDate))) : undefined
                    }
                    onClick={handleClickDate}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styleMenubar = css`
  display: flex;
  align-items: center;
  margin-bottom: ${gutter(4)};
  font-size: ${FontSize.Regular};

  > :not(:first-child) {
    margin-left: ${gutter(2)};
  }

  > select {
    flex: 1 1 100%;
    text-align: center;
    appearance: none;
    background-color: transparent;
    border: none;
  }
`;

const styleCalendar = css`
  width: 100%;
  font-size: ${FontSize.Small};

  > thead {
    th {
      font-weight: normal;
      color: ${cssVar('TextSub')};
    }
  }

  > tbody {
    td {
      text-align: center;
    }
  }
`;

const yearGroup = [...Array(31).keys()].map((year) => ({
  year: 2000 + year,
  months: [...Array(12).keys()].map((month) => {
    const d = new Date(2000 + year, month);
    return {
      label: format(d, 'MMM YYYY', 'en'),
      value: d.getTime(),
    };
  }),
}));

const options = yearGroup.reduce((acc: number[], { months }) => [...acc, ...months.map(({ value }) => value)], []);

const WeekLabels = ['日', '月', '火', '水', '木', '金', '土'] as const;

/**
 * 任意の月を構成する日にちの配列を取得します。
 *
 * @param page - 取得したい月に該当する Date オブジェクト
 *
 * @example
 * ```
 * [
 *   [undefined, undefined, undefined, 1/01, 1/02, 1/03, 1/04],
 *   [1/05,      1/06,      1/07,      1/08, 1/09, 1/10, 1/11],
 *   ...
 *   [1/26,      1/27,      1/28,      1/29, 1/30, 1/31, undefined],
 * ]
 * ```
 */
function getDateArray(page: Date): (Date | undefined)[][] {
  const padStart = Array.from<undefined>({ length: monthStart(page).getDay() });

  const dates = [...Array(monthEnd(page).getDate()).keys()].map(
    (i) => new Date(page.getFullYear(), page.getMonth(), i + 1),
  );

  const headLength = (padStart.length + dates.length) % 7 || 7;

  const padEnd = Array.from<undefined>({ length: 7 - headLength });

  return splitChunk<Date | undefined>([...padStart, ...dates, ...padEnd], 7);
}

function splitChunk<T>(array: T[], size: number) {
  return array.reduce<T[][]>((acc, _, i) => (i % size ? acc : [...acc, array.slice(i, i + size)]), []);
}
