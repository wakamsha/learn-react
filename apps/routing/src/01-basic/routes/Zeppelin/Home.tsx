import { type FC } from 'react';
import { generatePath, Navigate } from 'react-router';
import { routes } from '../../routes';

/**
 * レッド・ツェッペリンについての説明を表示するページコンポーネントです。
 *
 * このページは、`/zeppelin` リンクからメンバー詳細にリダイレクトすることを想定しています。
 */
export const Home: FC = () => <Navigate replace to={generatePath(routes.ZeppelinMember, { member: 'robert-plant' })} />;
