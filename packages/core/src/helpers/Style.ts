/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { css, injectGlobal } from '@emotion/css';
import { color } from 'csx';
import { Color, FontFamily, Shadow } from '../constants/Style';
import NotoSansMedium from './fonts/noto-sans/NotoSansJP-Medium.woff';
import NotoSansRegular from './fonts/noto-sans/NotoSansJP-Regular.woff';
import NotoSerifRegular from './fonts/noto-serif/NotoSerifJP-Regular.woff';
import NotoSerifSemiBold from './fonts/noto-serif/NotoSerifJP-SemiBold.woff';

/**
 * スタイル定数から CSS 変数にアクセスする式を返します。
 *
 * @param key - カラーネーム
 *
 * @example
 * ```
 * cssVar('Primary')      // var(--primary)
 * cssVar('TexturePaper') // var(--texture-paper)
 * ```
 */
export function cssVar(
  key: keyof typeof Color | keyof typeof Shadow,
): `var(--${keyof typeof Color | keyof typeof Shadow})` {
  return `var(--${key})`;
}

/**
 * Margin や Padding など余白の値を算出して返す。
 *
 * 余白は 4 の倍数として定義されている。
 *
 * @param value - 係数
 */
export function gutter(value: number): string {
  return `${4 * value}px`;
}

/**
 * 矩形サイズを返す。
 *
 * @param value - 一辺の長さ
 */
export function square(value: string | number) {
  const side = typeof value === 'number' ? `${value}px` : value;

  return `
    width: ${side};
    height: ${side};
  `;
}

/**
 * rgba カラーモデルの値（文字列）を生成して返す。
 *
 * @param hex - HEX 値のカラーコード
 *
 * @param opacity - 不透明度
 *
 * @example
 * toRGBA('#0ff', 0.5) //=> rgba(0, 255, 255, 0.5)
 */
export function hex2rgba(hex: string, opacity: number) {
  const rgb = color(hex);
  return `rgba(${rgb.red()}, ${rgb.green()}, ${rgb.blue()}, ${opacity})`;
}

/**
 * 視覚上は見えなくなるが、操作は可能となるスタイル。
 *
 * @see https://github.com/twbs/bootstrap/blob/a4a04cd9ec741050390746f8056cc79a9c04c8df/scss/mixins/_screen-reader.scss#L8-L18
 */
export function visuallyHidden() {
  return css`
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: 0;
    overflow: hidden;
    white-space: nowrap;
    border: none;
    clip: rect(0, 0, 0, 0);
  `;
}

/**
 * 単一業テキストの末尾を三点リーダーで省略します。
 */
export function textEllipsis() {
  return `
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `;
}

/**
 * アプリケーション全体に Reset CSS を適用します。
 *
 * @remarks
 * This Reset CSS is based-on "A (more) modern CSS reset" by Andy Bell
 *
 * @see https://piccalil.li/blog/a-more-modern-css-reset/
 */
export function applyResetStyle() {
  // oxlint-disable-next-line no-unused-expressions
  injectGlobal`
    /* Box sizing rules */
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    html {
      overflow-x: hidden;
      scroll-behavior: smooth;

      /* Prevent font size inflation */
      text-size-adjust: none;
    }

    /* Remove default margin in favour of better control in authored CSS */
    body,
    h1,
    h2,
    h3,
    h4,
    p,
    figure,
    blockquote,
    ul,
    ol,
    dl,
    dd {
      margin: 0;
    }

    /* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
    ul[role='list'],
    ol[role='list'] {
      list-style: none;
    }

    /* Set core body defaults */
    body {
      min-height: 100dvh;
      line-height: 1.5;
    }

    /* Set shorter line heights on headings and interactive elements */
    h1,
    h2,
    h3,
    h4,
    button,
    input,
    label {
      line-height: 1.1;
    }

    /* Balance text wrapping on headings */
    h1,
    h2,
    h3,
    h4 {
      text-wrap: balance;
    }

    /* A elements that don't have a class get default styles */
    a:not([class]) {
      text-decoration-skip-ink: auto;
      color: currentcolor;
    }

    /* Make images easier to work with */
    img,
    picture {
      display: block;
      max-width: 100%;
    }

    /* Inherit fonts for inputs and buttons */
    input,
    button,
    textarea,
    select {
      font-family: inherit;
      font-size: inherit;

      /* When the focus is not given by keyboard operation, the outline disappears. */
      &:focus:not(:focus-visible) {
        outline: 0;
      }
    }

    /* Make sure textarea without a rows attribute are not tiny */
    /* stylelint-disable-next-line no-descending-specificity */
    textarea:not([rows]) {
      min-height: 10em;
    }

    /* Anything that has been anchored to should have extra scroll margin */
    :target {
      scroll-margin-block: 5ex;
    }
  `;
}

/**
 * アプリケーション全体にベースとなるスタイルを適用します。
 */
export function applyGlobalStyle() {
  // oxlint-disable-next-line no-unused-expressions
  injectGlobal`
    @font-face {
      font-family: 'Noto Sans Japanese';
      font-style: normal;
      font-weight: normal;
      src: local('Noto Sans Japanese'), url(${NotoSansRegular}) format('woff');
      font-display: swap;
    }

    @font-face {
      font-family: 'Noto Sans Japanese';
      font-style: normal;
      font-weight: bold;
      src: local('Noto Sans Japanese Bold'), url(${NotoSansMedium}) format('woff');
      font-display: swap;
    }

    @font-face {
      font-family: 'Noto Serif Japanese';
      font-style: normal;
      font-weight: normal;
      src: local('Noto Serif Japanese'), url(${NotoSerifRegular}) format('woff');
      font-display: swap;
    }

    @font-face {
      font-family: 'Noto Serif Japanese';
      font-style: normal;
      font-weight: bold;
      src: local('Noto Serif Japanese Bold'), url(${NotoSerifSemiBold}) format('woff');
      font-display: swap;
    }

    :root:is(.light) {
      ${Object.fromEntries(Object.entries({ ...Color, ...Shadow }).map(([key, value]) => [`--${key}`, value.light]))}
    }

    :root:is(.dark) {
      color-scheme: dark;
      ${Object.fromEntries(Object.entries({ ...Color, ...Shadow }).map(([key, value]) => [`--${key}`, value.dark]))}
    }

    /* OS Default */
    :root:not(.light):not(.dark) {
      @media (prefers-color-scheme: light) {
        ${Object.fromEntries(Object.entries({ ...Color, ...Shadow }).map(([key, value]) => [`--${key}`, value.light]))}
      }

      @media (prefers-color-scheme: dark) {
        color-scheme: dark;
        ${Object.fromEntries(Object.entries({ ...Color, ...Shadow }).map(([key, value]) => [`--${key}`, value.dark]))}
      }
    }

    html,
    body {
      padding: 0;
      font-family: ${FontFamily.Default};
      font-weight: 500;
      font-feature-settings: "palt" 1;
      background-color: ${cssVar('TextureBody')};
    }

    ul,
    ol {
      padding: 0;
      list-style: none;
    }

    a {
      color: inherit;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  `;
}
