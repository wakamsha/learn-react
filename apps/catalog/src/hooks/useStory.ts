import { useMemo, type FC } from 'react';
import { stories } from '../constants/Stories';

type StoryData = {
  /**
   * story コンポーネント。
   * 原則として props を一切持たない。
   */
  Component: FC;
  /**
   * story のソースコード文字列。
   * `<code>` 要素の子要素として展開すると story コンポーネントのソースコードを表示できます。
   */
  sourceCode: string;
};

/**
 * Story コンポーネントとそのソースコード文字列のペアを取得します。
 * コンポーネントは props なしの React コンポーネントとして実行し、
 * ソースコード文字列は `<code>` 要素の子要素として展開すると story コンポーネントのソースコードを表示できます。
 *
 * @param storyKeys 取得する Story コンポーネントにアクセスするための key ( = ディレクトリ名 ) の配列。
 * @returns         Story コンポーネントとそのソースコード文字列のペア
 *
 * @example
 * ```ts
 * const { Component, sourceCode } = useStory([
 *   'core',
 *   'components',
 *   'inputs',
 *   'Button',
 * ]);
 *
 * return (
 *   <>
 *     <Component />
 *     <pre>
 *       <code>{sourceCode}</code>
 *     </pre>
 *   </>
 * );
 * ```
 */
export function useStory(storyKeys: string[]): StoryData {
  const { Component, sourceCode } = useMemo(() => {
    let snapShot: any = stories;

    for (let i = 0; i < storyKeys.length; i++) {
      if (!snapShot[storyKeys[i]]) {
        break;
      }
      snapShot = snapShot[storyKeys[i]];
    }

    return snapShot as StoryData;
  }, [storyKeys]);

  return { Component, sourceCode };
}
