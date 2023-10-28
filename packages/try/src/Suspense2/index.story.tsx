import { css } from '@emotion/css';
import { gutter } from '@learn-react/core/src/helpers/Style';
import { useState, type ChangeEvent } from 'react';
import { DataFetching1 } from './DataFetching1';
import { DataFetching2 } from './DataFetching2';
import { RenderAsYouFetch } from './RenderAsYouFetch';

const DemoList = ['DataFetching1', 'DataFetching2', 'RenderAsYouFetch'] as const;

type Demo = (typeof DemoList)[number];

export const Story = () => {
  const [demo, setDemo] = useState<Demo>('DataFetching1');

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setDemo(DemoList[event.target.selectedIndex]);
  };

  return (
    <>
      <h2>Suspense for Data Fetching</h2>
      <p>Suspense と Hooks を組み合わせたデータ取得デモ。</p>

      <label className={styleSelectForm}>
        <span>Demo</span>
        <select name="demo" value={demo} onChange={handleChange}>
          {DemoList.map((demo) => (
            <option key={demo}>{demo}</option>
          ))}
        </select>
      </label>

      <hr />

      {demo === 'DataFetching1' ? (
        <DataFetching1 />
      ) : demo === 'DataFetching2' ? (
        <DataFetching2 />
      ) : (
        <RenderAsYouFetch />
      )}
    </>
  );
};

const styleSelectForm = css`
  display: flex;
  gap: ${gutter(2)};
  align-items: center;
`;
