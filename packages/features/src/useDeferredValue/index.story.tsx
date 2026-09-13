import { useDeferredValue, useState, type ChangeEvent } from 'react';

/**
 * `useDeferredValue` を使ったサンプル。
 *
 * lodash や RxJS の debounce のように毎回更新する必要がなく、
 * ( 多少遅延したとしても ) 最新の値さえ反映されれば良い場合に効果的です。
 * 実際に反映までどれくらい遅延するかは React のレンダリングスケジュールに依存します。
 *
 * @remarks
 * 遅延時間を明示的に指定する必要がある場合は {@link useDebouncedState} を使ってください。
 *
 * @see {@link https://ja.reactjs.org/docs/hooks-reference.html#usedeferredvalue useDeferredValue}
 */
export const Story = () => {
  const [text, setText] = useState('');

  const deferredText = useDeferredValue(text);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <>
      <h2>Deferred Text</h2>
      <input value={text} onChange={handleChange} />
      <pre>
        <code>{JSON.stringify({ deferredText }, null, 2)}</code>
      </pre>
    </>
  );
};
