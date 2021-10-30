import { css } from '@emotion/css';
import { Color, FontSize, LineHeight } from '.';
import { cssVar, gutter, textEllipsis } from '../../helpers/Style';

export const Story = () => {
  const colors = Object.entries(Color).map(([name, color]) => ({ name, color }));

  return (
    <>
      <h3>Color</h3>
      <ul className={styleBase}>
        {colors.map(({ name, color }) => (
          <li key={name}>
            <ColorTip name={name} color={color} />
          </li>
        ))}
      </ul>
    </>
  );
};

type ColorTipProps = {
  name: string;
  color: {
    light: string;
    dark: string;
  };
};

const ColorTip = ({ name, color }: ColorTipProps) => {
  const hex = window.matchMedia('(prefers-color-scheme: dark)').matches ? color.dark : color.light;

  return (
    <div
      className={styleColorBox}
      style={{
        backgroundColor: cssVar(name as keyof typeof Color),
        color: getReadableColor(hex),
      }}
    >
      <div className={styleColorName}>{name}</div>
      <code className={styleColorValue}>{hex}</code>
    </div>
  );
};

/**
 * コントラスト比的に対照的な（背景色 vs 前景色としたとき視認性が落ちない）色を返す
 * @see https://zenn.dev/hyiromori/articles/hatena-20201112-182643
 *
 * @param color #FFCC00 のような値
 */
function getReadableColor(color: string) {
  const darkColor = '#000000';
  const lightColor = '#ffffff';

  const darkRatio = getContrastRatio(color, darkColor);
  const lightRatio = getContrastRatio(color, lightColor);

  return lightRatio > darkRatio ? lightColor : darkColor;
}

/**
 * 色のコントラスト比を算出する
 *
 * @param color1 #FFCC00 のような値
 * @param color2 #FFCC00 のような値
 */
function getContrastRatio(color1: string, color2: string) {
  const luminance1 = getRelativeLuminance(color1);
  const luminance2 = getRelativeLuminance(color2);

  const bright = Math.max(luminance1, luminance2);
  const dark = Math.min(luminance1, luminance2);

  return (bright + 0.05) / (dark + 0.05);
}

/**
 * 相対輝度に変換する
 *
 * @param hexColor #FFCC00 のような値
 */
function getRelativeLuminance(hexColor: string) {
  const { red, green, blue } = parseHexColor(hexColor);

  const R = getRGBForCalculateLuminance(red);
  const G = getRGBForCalculateLuminance(green);
  const B = getRGBForCalculateLuminance(blue);

  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

/**
 * HEX 文字列を R, G, B それぞれの値にパースする
 *
 * @param value #FFCC00 のような値
 */
function parseHexColor(value: string) {
  const [, red, green, blue] = value.match(/#(..)(..)(..)/) ?? [];

  return {
    red: parseInt(`0x${red}`, 16),
    green: parseInt(`0x${green}`, 16),
    blue: parseInt(`0x${blue}`, 16),
  };
}

/**
 * 人間の視覚特性にあった輝度に変換する
 *
 * @param color 0 から 255 までの RGB どれかの値
 */
function getRGBForCalculateLuminance(color: number) {
  const ratio = color / 255;
  if (ratio <= 0.03928) {
    return ratio / 12.92;
  }

  return ((ratio + 0.055) / 1.055) ** 2.4;
}

const styleBase = css`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: ${gutter(4)};
  list-style: none;
`;

const styleColorBox = css`
  min-height: 120px;
  padding: ${gutter(2)};
  word-break: break-word;
  box-shadow: ${cssVar('ShadowNeutral')};

  > :not(:first-child) {
    margin-top: ${gutter(2)};
  }
`;

const styleColorName = css`
  font-size: ${FontSize.Small};
  line-height: ${LineHeight.Compressed};
`;

const styleColorValue = css`
  display: block;
  font-size: ${FontSize.Regular};
  font-weight: bold;
  line-height: 1.2;

  ${textEllipsis()}
`;
