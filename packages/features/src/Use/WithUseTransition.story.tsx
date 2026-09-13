import { css } from '@emotion/css';
import { requestGetUser, type User } from '@learn-react/core/src/api/user';
import { gutter } from '@learn-react/core/src/helpers/Style';
import { type ChangeEvent, Suspense, use, useState, useTransition } from 'react';

/**
 * `Suspense` と `use` と `useTransition` を組み合わせたデータ取得のデモ。
 *
 * `startTransition` を使用して Promise の更新をトランジションとして扱うことで、
 * データ取得中も画面全体が `Suspense` のフォールバックに切り替わるのを防ぎ、
 * `isPending` によるトランジション中の状態表示を可能にします。
 */
export const Story = () => {
  // 疑似的な遅延時間（ミリ秒）。
  const delayTime = 800;

  const [dataPromise, setDataPromise] = useState(() => fetchUserWithDelay(1, delayTime));

  const [enableTransition, setEnableTransition] = useState(true);

  const [isPending, startTransition] = useTransition();

  const handleChange = ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
    const id = Number(value);

    if (enableTransition) {
      startTransition(() => {
        setDataPromise(fetchUserWithDelay(id, delayTime));
      });
    } else {
      setDataPromise(fetchUserWithDelay(id, delayTime));
    }
  };

  return (
    <>
      <h2>Suspense + Use + useTransition</h2>

      <p>React 組み込み API である Suspense, use, useTransition を組み合わせたデータ取得デモ。</p>

      <div className={styleControls}>
        <label className={styleLabel}>
          <input
            type="checkbox"
            checked={enableTransition}
            onChange={(event) => {
              setEnableTransition(event.target.checked);
            }}
          />
          <span>useTransition を有効にする</span>
        </label>

        <label className={styleLabel}>
          <span>Select User: </span>
          <select onChange={handleChange}>
            {[...Array(10).keys()].map((index) => (
              <option key={index} value={index + 1}>
                User {index + 1}
              </option>
            ))}
          </select>
        </label>
      </div>

      <hr />

      <div className={styleContentArea({ isPending })}>
        <Suspense fallback={<div>Loading...</div>}>
          <User dataPromise={dataPromise} />
        </Suspense>

        {isPending ? <span className={styleIndicator}>Pending...</span> : null}
      </div>
    </>
  );
};

/**
 * 疑似的な人工遅延を付与してユーザー情報を取得する関数。
 *
 * @param id - 取得対象のユーザーID
 *
 * @param delayTime - 遅延時間（ミリ秒）
 */
function fetchUserWithDelay(id: number, delayTime = 800): Promise<User> {
  if (delayTime <= 0) {
    return requestGetUser({ path: String(id) });
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      requestGetUser({ path: String(id) })
        .then(resolve)
        .catch(reject);
    }, delayTime);
  });
}

const styleControls = css`
  display: grid;
  gap: ${gutter(2)};
  align-items: center;
  margin-top: ${gutter(2)};
`;

const styleLabel = css`
  display: flex;
  gap: ${gutter(1)};
  align-items: center;
`;

const styleContentArea = ({ isPending }: { isPending: boolean }) => css`
  position: relative;
  opacity: ${isPending ? 0.5 : 1};
`;

const styleIndicator = css`
  position: absolute;
  inset: 0 0 auto auto;
  z-index: 1;
  display: block;
  padding: ${gutter(1)};
  border: 1px solid;
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
