import { type FC } from 'react';
import { Navigate } from 'react-router';

type Props = {
  to: string;
};

/**
 * レッド・ツェッペリンについての説明を表示するページコンポーネントです。
 *
 * このページは、`/zeppelin` リンクからメンバー詳細にリダイレクトすることを想定しています。
 */
export const Home: FC<Props> = ({ to }) => <Navigate replace to={to} />;
