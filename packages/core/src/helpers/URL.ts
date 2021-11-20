/* eslint-disable @typescript-eslint/no-unused-vars */
import { generatePath as generatePathOrigin } from 'react-router';

type ExtractRouteOptionalParam<T extends string, U = string | number | boolean> = T extends `${infer Param}?`
  ? { [k in Param]?: U }
  : { [k in T]: U };

type ExtractRouteParams<T extends string, U = string | number | boolean> = string extends T
  ? { [k in string]?: U }
  : T extends `${infer _Start}:${infer ParamWithOptionalRegExp}/${infer Rest}`
  ? ParamWithOptionalRegExp extends `${infer Param}`
    ? ExtractRouteOptionalParam<Param, U> & ExtractRouteParams<Rest, U>
    : ExtractRouteOptionalParam<ParamWithOptionalRegExp, U> & ExtractRouteParams<Rest, U>
  : T extends `${infer _Start}:${infer ParamWithOptionalRegExp}`
  ? ParamWithOptionalRegExp extends `${infer Param}`
    ? ExtractRouteOptionalParam<Param, U>
    : ExtractRouteOptionalParam<ParamWithOptionalRegExp, U>
  : {};

/**
 * ルーティングのための URL パスを生成します。
 *
 * @param pattern URL パスのパターン（テンプレート）
 * @param params 第一引数のパターンに対応したパラメータを持つオブジェクト。
 * @returns
 */
export function generatePath<S extends string>(pattern: S, params: ExtractRouteParams<S>): string {
  const optimizedParams = Object.entries(params).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: `${value}`,
    }),
    {} as Record<keyof typeof params, string>,
  );

  return generatePathOrigin(pattern, optimizedParams);
}
