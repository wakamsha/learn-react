import { css, injectGlobal } from '@emotion/css';
import { Color, Shadow } from '@learn-react/core/constants/Style';
import { gutter, square } from '@learn-react/core/helpers/Style';

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
        {/* Theme:Primary */}
        <tr>
          <th>ThemePrimaryLighter</th>
          <td>
            <Tile color={Color.ThemePrimaryLighter} />
          </td>
          <td>
            <Tile color="#bfc0c4" />
          </td>
        </tr>
        <tr>
          <th>ThemePrimaryNeutral</th>
          <td>
            <Tile color={Color.ThemePrimaryNeutral} />
          </td>
          <td>{/* <Tile /> */}</td>
        </tr>
        <tr>
          <th>ThemePrimaryDark</th>
          <td>
            <Tile color={Color.ThemePrimaryDark} />
          </td>
          <td>{/* <Tile /> */}</td>
        </tr>
        <tr>
          <th>ThemePrimaryDarker</th>
          <td>
            <Tile color={Color.ThemePrimaryDarker} />
          </td>
          <td>{/* <Tile /> */}</td>
        </tr>
        {/* Theme:Danger */}
        <tr>
          <th>ThemeDangerLighter</th>
          <td>
            <Tile color={Color.ThemeDangerLighter} />
          </td>
          <td>
            <Tile color={Color.ThemeDangerLighter} />
          </td>
        </tr>
        <tr>
          <th>ThemeDangerLight</th>
          <td>
            <Tile color={Color.ThemeDangerLight} />
          </td>
          <td>
            <Tile color={Color.ThemeDangerLight} />
          </td>
        </tr>
        <tr>
          <th>ThemeDangerNeutral</th>
          <td>
            <Tile color={Color.ThemeDangerNeutral} />
          </td>
          <td>
            <Tile color={Color.ThemeDangerNeutral} />
          </td>
        </tr>
        <tr>
          <th>ThemeDangerDark</th>
          <td>
            <Tile color={Color.ThemeDangerDark} />
          </td>
          <td>
            <Tile color={Color.ThemeDangerDark} />
          </td>
        </tr>
        {/* Theme:Disabled */}
        <tr>
          <th>ThemeDisabledLight</th>
          <td>
            <Tile color={Color.ThemeDisabledLight} />
          </td>
          <td>
            <Tile color="#bbbcc1" />
          </td>
        </tr>
        <tr>
          <th>ThemeDisabledNeutral</th>
          <td>
            <Tile color={Color.ThemeDisabledNeutral} />
          </td>
          <td>
            <Tile color="#737373" />
          </td>
        </tr>
        <tr>
          <th>ThemeDisabledDark</th>
          <td>
            <Tile color={Color.ThemeDisabledDark} />
          </td>
          <td>{/* <Tile /> */}</td>
        </tr>

        {/* Text */}
        <tr>
          <th>TextNeutral</th>
          <td>
            <Tile color={Color.TextNeutral} />
          </td>
          <td>
            <Tile color="#f2f2f2" />
          </td>
        </tr>
        <tr>
          <th>TextSub</th>
          <td>
            <Tile color={Color.TextSub} />
          </td>
          <td>
            <Tile color="#8d8f93" />
          </td>
        </tr>

        {/* Line */}
        <tr>
          <th>LineLight</th>
          <td>
            <Tile color={Color.LineLight} />
          </td>
          <td>
            <Tile color="#bfc0c4" />
          </td>
        </tr>
        <tr>
          <th>LineNeutral</th>
          <td>
            <Tile color={Color.LineNeutral} />
          </td>
          <td>{/* <Tile /> */}</td>
        </tr>
        <tr>
          <th>LineDark</th>
          <td>
            <Tile color={Color.LineDark} />
          </td>
          <td>{/* <Tile /> */}</td>
        </tr>

        {/* Texture */}
        <tr>
          <th>TextureBody</th>
          <td>
            <Tile color={Color.TextureBody} />
          </td>
          <td>
            <Tile color="#44444A" />
          </td>
        </tr>
        <tr>
          <th>TextureCode</th>
          <td>
            <Tile color={Color.TextureCode} />
          </td>
          <td>{/* <Tile /> */}</td>
        </tr>
        <tr>
          <th>TextureInput</th>
          <td>
            <Tile color={Color.TextureInput} />
          </td>
          <td>
            <Tile color="#12121B" />
          </td>
        </tr>
        <tr>
          <th>TextureBackdrop</th>
          <td>
            <Tile color={Color.TextureBackdrop} />
          </td>
          <td>
            <Tile color="#1F1F23" />
          </td>
        </tr>
        <tr>
          <th>TexturePale</th>
          <td>
            <Tile color={Color.TexturePale} />
          </td>
          <td>
            <Tile color="#12121B" />
          </td>
        </tr>
        <tr>
          <th>TexturePaper</th>
          <td>
            <Tile color={Color.TexturePaper} />
          </td>
          <td>
            <Tile color="#62626A" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

const styleTable = css`
  border-collapse: collapse;

  th,
  td {
    padding: ${gutter(2)} ${gutter(4)};
    border: 1px solid;
  }

  tbody th {
    text-align: left;
  }
`;

const Tile = ({ color }: { color?: string }) => <span className={styleTile} style={{ backgroundColor: color }} />;

const styleTile = css`
  display: block;
  margin: auto;
  box-shadow: ${Shadow.Neutral};
  ${square(40)}
`;

injectGlobal`
  :root {
    --ThemeTextureBody: ${Color.TextureBody};
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --ThemeTextureBody: #44444A;
    }
  }

  body {
    background-color: var(--ThemeTextureBody);
  }
`;
