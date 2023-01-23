import { Suspense, type ComponentType, type ReactNode } from 'react';

/**
 * 非同期で読み込むコンポーネントを React.Suspense でラップした新しいコンポーネントを返します。
 *
 * @typeParam Props - `Component` が持つ Props の型。自動推論されるため、殆どの場合において指定不要。
 *
 * @param Component ラップするコンポーネント。
 * @param fallback フォールバック時に表示する Node。
 *
 * @example
 * ```ts
 * const SomePage = withSuspense(
 *   lazy(() =>
 *     import(
 *       './path/to/SomePage'
 *     ).then(({ SomePage }) => ({ default: SomePage })),
 *   ),
 * );
 * ```
 */
export function withSuspense<Props extends Record<string, unknown>>(
  Component: ComponentType<Props>,
  fallback: ReactNode = null,
) {
  return (props: Props) => (
    <Suspense fallback={fallback}>
      <Component
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    </Suspense>
  );
}
