import { type ReactElement, type ReactNode } from 'react';
import { createRoutesFromChildren, matchRoutes, useLocation } from 'react-router-dom';
import { Transition } from '../Transition';

type Props = {
  /**
   * 子ルートのセット。
   *
   * @remarks
   * ReactRouter の `<Routes>` タグのみ配置可能。
   */
  children: ReactElement<{ children: ReactNode }>;
  /**
   * 親 route の URL パス。
   *
   * `<PageTransition>` を入れ子にして使用する際は、親となる `<Route>` の `path` を指定する必要があります。
   */
  parentPath?: string;
};

/**
 * React Router におけるルート (≒ URL ) 遷移の開始・終了にアニメーションを適用します。
 *
 * @param props - `Transition` コンポーネントに依存
 *
 * @remarks
 * `children` に渡された `<Routes>` の各 `<Route>` から現在の URL に一致するルートを探し、その `pathnameBase` を `<Transition>` の `id` に渡します。
 * `id` が変化した際にアニメーションが再生されるため、動的セグメント (`:id` など) を含む同一ルート内でのパラメータ変更ではアニメーションは発生しません。
 *
 * @example
 * ```tsx
 * <PageTransition parentPath="/parent">
 *   <Routes>
 *     <Route path="child" element={<ChildPage />} />
 *     <Route path="another-child" element={<AnotherChildPage />} />
 *   </Routes>
 * </PageTransition>
 * ```
 */
export const PageTransition = ({ children, parentPath = '' }: Props) => {
  const currentPathname = useCurrentPathname(children.props.children, parentPath);

  return <Transition id={currentPathname}>{children}</Transition>;
};

/**
 * 現在の URL に一致するルートの `pathnameBase` を返します。
 *
 * @param children - `<Routes>` の子要素
 *
 * @param parentPath - 親ルートの URL パス
 *
 * @returns 現在の URL に一致するルートの `pathnameBase`
 */
function useCurrentPathname(children: ReactNode, parentPath = '') {
  const location = useLocation();

  const routes = createRoutesFromChildren(children).map((route) => ({
    ...route,
    ...(route.path && parentPath ? { path: `${parentPath}${route.path}` } : {}),
  }));

  const matchedRoute = matchRoutes(routes, location)?.[0] ?? { pathnameBase: '' };

  return matchedRoute.pathnameBase;
}
