import { css } from '@emotion/css';
import type { ReactNode } from 'react';
import { useMemo, useRef, useState } from 'react';
import { Duration, Easing } from '../../../constants/Style';

type TransitionType = 'horizontal' | 'vertical' | 'scale';

type Props = {
  /**
   * この値が更新されると transition 処理が実行される。
   * React 予約語の key と用途はほぼ同じ。
   */
  id: string | number;
  children: ReactNode;
  type?: TransitionType;
};

/**
 * ReactNode の表示・非表示にアニメーションを適用します。
 *
 * @param props
 */
export const Transition = ({ id: propId, children, type = 'horizontal' }: Props) => {
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
  // useLayoutEffect だと要素が多く描画コストの高い画面へ遷移する際に一瞬だが動作が硬直してしまう。
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

      nextElm.current.classList.add(styleEnter);

      window.setTimeout(() => {
        if (!nextElm.current) return;
        nextElm.current.classList.remove(styleEnter);
        setHtml('');
      }, enterDelay);
    }
  }, [html, id, propId]);

  return (
    <div className={styleBase}>
      <div className={`${styleAnimation} ${styleType[type]}`} ref={nextElm}>
        {children}
      </div>
      <div
        className={`${styleAnimation} ${styleType[type]} ${html ? styleLeave : ''}`}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};

const offset = 30;
const enterDelay = 80;
const ratio = 0.98;

const styleBase = css`
  position: relative;
  overflow: hidden;
`;

const styleAnimation = css`
  opacity: 1;
  transition: transform ${Duration.Enter} ${enterDelay}ms ${Easing.Enter},
    opacity ${Duration.Enter} ${enterDelay}ms ${Easing.Enter};
  transform: none;
`;

const styleEnter = css`
  position: absolute;
  opacity: 0;
  transition: none;
`;

const styleLeave = css`
  opacity: 0;
  transition: transform ${Duration.Leave} ${Easing.Leave}, opacity ${Duration.Leave} ${Easing.Leave};
`;

const styleType: Frozen<TransitionType, string> = {
  horizontal: css`
    ${`&.${styleEnter}`} {
      transform: translate3d(${offset}px, 0, 0);
    }

    ${`&.${styleLeave}`} {
      transform: translate3d(${offset}px, 0, 0);
    }
  `,
  vertical: css`
    ${`&.${styleEnter}`} {
      transform: translate3d(0, ${offset}px, 0);
    }

    ${`&.${styleLeave}`} {
      transform: translate3d(0, ${offset}px, 0);
    }
  `,
  scale: css`
    ${`&.${styleEnter}`} {
      transform: scale3d(${ratio}, ${ratio}, 0);
    }

    ${`&.${styleLeave}`} {
      transform: scale3d(${ratio}, ${ratio}, 0);
    }
  `,
};
