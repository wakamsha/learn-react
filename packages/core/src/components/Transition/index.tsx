import { Duration, Easing } from '../../constants/Style';
import { css } from 'emotion';
import React, { ReactNode, useMemo, useRef, useState } from 'react';

type Props = {
  /**
   * この値が更新されると transition 処理が実行される。
   * React 予約語の key と用途はほぼ同じ。
   */
  id: string | number;
  children: ReactNode;
};

export const Transition = ({ id: propId, children }: Props) => {
  /**
   * 遷移先（次のページ）の要素を格納する Div コンテナ。
   */
  const nextElm = useRef<HTMLDivElement>(null);

  /**
   * 現在の id 値を格納。
   * prop から渡された値が更新されたものかどうかを比較するのに使う。
   */
  const [id, setId] = useState(propId);

  /**
   * 遷移元（現在のページ）の innerHTML を格納する。
   */
  const [html, setHtml] = useState('');

  // 実行タイミングの関係上やむなく useMemo を使用。
  // useEffect だとアニメーション開始前の状態が描画されてしまうためカッコ悪く、
  // useLayoutEffect だと Home など要素の多い画面へ遷移する際に一瞬とはいえ動作が硬直してしまう。
  useMemo(() => {
    if (id !== propId && !html && nextElm.current) {
      // 以下はトランジション処理の大まかな流れ。
      //
      // 1. 遷移元の HTML 要素をまるごと複製し、 state に格納してレンダリングする。
      // 2. 遷移先の要素が格納される Div コンテナに css クラスを付与してアニメーションを開始させる。
      // 3. アニメーション分の時間を置いたのち下記を実行する。
      //   3-a. アニメーション用 CSS クラスを外す。
      //   3-b. 遷移元の HTML 要素を消去する。
      setId(propId);
      setHtml(nextElm.current.innerHTML);

      nextElm.current.classList.add(enterStyle);

      window.setTimeout(() => {
        if (!nextElm.current) return;
        nextElm.current.classList.remove(enterStyle);
        setHtml('');
      }, ENTER_DELAY);
    }
  }, [html, id, propId]);

  return (
    <div className={baseStyle}>
      <div className={`${animationStyle} ${horizontalStyle}`} ref={nextElm}>
        {children}
      </div>
      <div
        className={`${animationStyle} ${horizontalStyle} ${html ? leaveStyle : ''}`}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};

const OFFSET = 30;
const ENTER_DELAY = 80;

const baseStyle = css`
  position: relative;
  overflow: hidden;
`;

const animationStyle = css`
  opacity: 1;
  transition: transform ${Duration.Enter} ${ENTER_DELAY}ms ${Easing.Enter},
    opacity ${Duration.Enter} ${ENTER_DELAY}ms ${Easing.Enter};
  transform: none;
`;

const enterStyle = css`
  position: absolute;
  opacity: 0;
  transition: none;
`;

const leaveStyle = css`
  opacity: 0;
  transition: transform ${Duration.Leave} ${Easing.Leave}, opacity ${Duration.Leave} ${Easing.Enter};
`;

const horizontalStyle = css`
  &.${enterStyle} {
    transform: translate3d(${OFFSET}px, 0, 0);
  }

  &.${leaveStyle} {
    transform: translate3d(${OFFSET}px, 0, 0);
  }
`;
