import { css } from '@emotion/css';
import { requestGetUser, type User } from '@learn-react/core/src/api/user';
import { gutter } from '@learn-react/core/src/helpers/Style';
import { type ChangeEvent, Suspense, use, useState } from 'react';

/**
 * `Suspense` と `use` を使ったデータフェッチングのサンプル。
 *
 * データフェッチ関数の戻り値（ Promise ）を `use` でラップすることで、 `Suspense` と協調したデータ取得が可能です。
 *
 * @see {@link https://ja.react.dev/reference/react/use use}
 */
export const Story = () => {
  const [dataPromise, setDataPromise] = useState(() =>
    requestGetUser({
      path: '1',
    }),
  );

  const handleChange = ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
    setDataPromise(
      requestGetUser({
        path: value,
      }),
    );
  };

  return (
    <>
      <h2>Suspense + Use</h2>

      <p>React 組み込み API である Suspense と Use を組み合わせたデータ取得デモ。</p>

      <label className={styleSelectForm}>
        <span>Select User: </span>
        <select onChange={handleChange}>
          {[...Array(10).keys()].map((index) => (
            <option key={index} value={index + 1}>
              User {index + 1}
            </option>
          ))}
        </select>
      </label>

      <hr />

      <Suspense fallback={<div>Loading...</div>}>
        <User dataPromise={dataPromise} />
      </Suspense>
    </>
  );
};

const styleSelectForm = css`
  display: flex;
  gap: ${gutter(2)};
  align-items: center;
`;

type InternalProps = {
  dataPromise: Promise<User>;
};

const User = ({ dataPromise }: InternalProps) => {
  const data = use(dataPromise);

  return (
    <pre>
      <code>{JSON.stringify(data, null, 2)}</code>
    </pre>
  );
};
