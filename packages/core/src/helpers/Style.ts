import { css, injectGlobal } from '@emotion/css';
import { color } from 'csx';

/**
 * Margin や Padding など余白の値を算出して返す。
 *
 * 余白は 4 の倍数として定義されている。
 * @param value
 */
export function gutter(value: number): string {
  return `${4 * value}px`;
}

/**
 * 矩形サイズを返す。
 *
 * @param value 一辺の長さ
 */
export function square(value: string | number) {
  return {
    width: value,
    height: value,
  };
}

/**
 * rgba カラーモデルの値（文字列）を生成して返す。
 *
 * @param hex HEX 値のカラーコード
 * @param opacity 不透明度
 *
 * @example
 * toRGBA('#0ff', 0.5) //=> rgba(0, 255, 255, 0.5)
 */
export function toRGBA(hex: string, opacity: number) {
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
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: none;
  `;
}

export function textEllipsis() {
  return css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `;
}

export function applyGlobalStyle() {
  return injectGlobal`
    /* Reset */
    /* 以下を参考 */
    /* https://github.com/hankchizljaw/modern-css-reset/blob/master/dist/reset.min.css */
    *,
    *:before,
    *:after {
      box-sizing: border-box;
      margin: 0;
    }
    html {
      overflow-x: hidden;
      font-family: sans-serif;
      -webkit-text-size-adjust: 100%;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      scroll-behavior: smooth;
    }
    body {
      min-height: 100vh;
      text-rendering: optimizeSpeed;
      line-height: 1.5;
    }
    a:not([class]) {
      text-decoration-skip-ink: auto;
    }
    img,
    picture {
      display: block;
      max-width: 100%;
    }
    input,
    button,
    textarea,
    select {
      font: inherit;
    }
    main {
      display: block;
      overflow-x: hidden;
    }

    /* Scaffolding */
    html,
    body {
      padding: 0;
      margin: 0;
      font-family: "Noto Sans Japanese", "メイリオ", Meiryo, sans-serif;
      font-weight: 500;
      font-feature-settings: palt 1;
    }
    body,
    h1,
    h2,
    h3,
    h4,
    p,
    ul,
    ol,
    figure,
    blockquote,
    dl,
    dd {
      margin: 0;
    }
    ul,
    ol {
      padding: 0;
      list-style: none;
    }
    /* stylelint-disable-next-line no-descending-specificity */
    a {
      color: inherit;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  `;
}
