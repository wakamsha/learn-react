import { color } from 'csx';
import { injectGlobal } from 'emotion';

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

export function applyGlobalStyle() {
  return injectGlobal`
    *,
    *:before,
    *:after {
      box-sizing: border-box;
    }

    html {
      font-family: sans-serif;
      line-height: 1.15;
      --webkit-text-size-adjust: 100%;
      --ms-text-size-adjust: 100%;
      --webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      overflow-x: hidden;
    }

    /* Scaffolding */
    html,
    body {
      margin: 0;
      padding: 0;
      font-weight: 500;
      font-feature-settings: palt 1;
    }
  `;
}
