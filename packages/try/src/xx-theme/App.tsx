import { css, injectGlobal } from '@emotion/css';
import { Color2, Shadow } from '@learn-react/core/constants/Style';
import { cssVar, gutter, square } from '@learn-react/core/helpers/Style';

export const ThemeApp = () => (
  <div>
    <table className={styleTable}>
      <thead>
        <tr>
          <th />
          <th>Light</th>
          <th>Dark</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(Color2).map(([key, values]) => (
          <tr key={key}>
            <th>{key}</th>
            {Object.values(values).map((value, index) => (
              <td key={index}>
                <Tile color={value} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const styleTable = css`
  border-collapse: collapse;
  background-color: white;

  th,
  td {
    padding: ${gutter(2)} ${gutter(4)};
    border: 1px solid;
  }

  tbody {
    th {
      text-align: left;
    }

    > tr:nth-child(odd) {
      > th,
      > td {
        background-color: #dfefff;
      }
    }
  }
`;

const Tile = ({ color }: { color?: string }) => (
  <div className={styleTile}>
    <span className={styleChip} style={{ backgroundColor: color }} />
    <code className={styleCode}>{color || '🤔'}</code>
  </div>
);

const styleTile = css`
  display: flex;
  flex-direction: column;
  gap: ${gutter(2)};
`;

const styleChip = css`
  display: block;
  margin: auto;
  box-shadow: ${Shadow.Neutral};
  ${square(40)}
`;

const styleCode = css`
  line-height: 1;
  text-align: center;
`;

injectGlobal`
  :root {
    ${css(
      Object.entries(Color2).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [`--${key}`]: value.light,
        }),
        {},
      ),
    )}
  }

  @media (prefers-color-scheme: dark) {
    :root {
      ${css(
        Object.entries(Color2).reduce(
          (acc, [key, value]) => ({
            ...acc,
            [`--${key}`]: value.dark,
          }),
          {},
        ),
      )}
    }
  }

  body {
    background-color: ${cssVar('TextureBody')};
  }
`;
