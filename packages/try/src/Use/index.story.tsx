import { requestGetUsers, type User } from '@learn-react/core/src/api/user';
import { Suspense, use } from 'react';

/**
 * `Suspense` と `use` を使ったデータフェッチングのサンプル。
 *
 * データフェッチ関数の戻り値（ Promise ）を `use` でラップすることで、 `Suspense` と協調したデータ取得が可能です。
 *
 * @remarks
 * `use` の引数に渡す Promise は原則としてサーバーコンポーネント内で生成することが推奨されます。
 * クライアントコンポーネント内で生成するとレンダリングの度に新しい Promise が生成され、無限ループに陥ります。
 * これを回避するには、 `use` を使うコンポーネントの外で Promise を生成し、それを Props として渡すようにします。
 *
 * @see {@link https://ja.react.dev/reference/react/use use}
 */
export const Story = () => {
  const dataPromise = requestGetUsers();

  return (
    <>
      <h2>Suspense + Use</h2>

      <p>React 組み込み API である Suspense と Use を組み合わせたデータ取得デモ。</p>

      <hr />

      <Suspense fallback={<div>Loading...</div>}>
        <Users dataPromise={dataPromise} />
      </Suspense>
    </>
  );
};

type InternalProps = {
  dataPromise: Promise<User[]>;
};

const Users = ({ dataPromise }: InternalProps) => {
  const data = use(dataPromise);

  return (
    <pre>
      <code>{JSON.stringify(data, null, 2)}</code>
    </pre>
  );
};
