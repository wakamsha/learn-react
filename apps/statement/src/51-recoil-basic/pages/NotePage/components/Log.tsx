import { css } from '@emotion/css';
import { FontFamily, LineHeight } from '@learn-react/core/src/constants/Style';
import { gutter } from '@learn-react/core/src/helpers/Style';
import { useNotepad } from '../states/NotepadState';

export const Log = () => {
  console.info('log');

  const {
    stats: { totalNum, totalCompletedNum, totalUncompletedNum, percentCompleted },
  } = useNotepad();

  const formattedPercentCompleted = Math.round(percentCompleted);

  return (
    <figure className={styleBase}>
      <pre>
        <code>
          {JSON.stringify({ totalNum, totalCompletedNum, totalUncompletedNum, formattedPercentCompleted }, null, 2)}
        </code>
      </pre>
    </figure>
  );
};

const styleBase = css`
  height: 100%;
  margin: 0;
  background-color: #0f192a;

  > pre {
    height: 100%;
    padding: ${gutter(4)};
    margin: 0;
    overflow: auto;
    color: #d1edff;

    > code {
      font-family: ${FontFamily.Monospace};
      font-size: 0.9rem;
      line-height: ${LineHeight.Compressed};
    }
  }
`;

// /**
//  * このセレクターは、メモ帳リストの統計を計算するために使用されます。
//  */
// const notesSelector = selector({
//   key: 'notepadStats',
//   get: ({ get }) => {
//     const notepadList = get(notepadState);

//     const totalNum = notepadList.length;
//     const totalCompletedNum = notepadList.filter((item) => item.isComplete).length;
//     const totalUncompletedNum = totalNum - totalCompletedNum;
//     const percentCompleted = totalNum === 0 ? 0 : (totalCompletedNum / totalNum) * 100;

//     return {
//       totalNum,
//       totalCompletedNum,
//       totalUncompletedNum,
//       percentCompleted,
//     };
//   },
// });
