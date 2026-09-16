import { type ReactNode, ViewTransition as ViewTransitionOrigin } from 'react';
import { Duration, Easing } from '../../../constants/Style';

type Props = {
  children: ReactNode;
};

/**
 * ビュー遷移を適用するコンポーネントです。
 */
export const ViewTransition = ({ children }: Props) => {
  const className = 'viewTransition';

  const offset = '30px';

  // 遷移先のアニメーション開始を遅らせる時間。
  // 遷移元のフェードアウトが十分に進んでから遷移先が現れるため、両者の重なりが目立たない。
  const enterDelay = '80ms';

  return (
    <>
      <ViewTransitionOrigin default={className}>{children}</ViewTransitionOrigin>

      <style precedence="medium">
        {`
        ::view-transition-old(root),
        ::view-transition-new(root) {
          mix-blend-mode: normal;
          animation: none;
        }

        @keyframes page-transition-enter {
          from {
            opacity: 0;
            transform: translate3d(${offset}, 0, 0);
          }

          to {
            opacity: 1;
            transform: none;
          }
        }

        @keyframes page-transition-leave {
          from {
            opacity: 1;
            transform: none;
          }

          to {
            opacity: 0;
            transform: translate3d(${offset}, 0, 0);
          }
        }

        /* 遷移元と遷移先を同じ位置に重ねたまま再生する。既定のサイズ・位置補間は行わない。 */
        ::view-transition-group(.${className}) {
          animation: none;
        }

        /* 重なっている間の加算合成を無効にし、単純な重ね合わせにする。 */
        ::view-transition-image-pair(.${className}) {
          isolation: auto;
        }

        /* スナップショットを原寸で描画し、遷移元・遷移先の高さの違いによる引き伸ばしを防ぐ。 */
        ::view-transition-old(.${className}),
        ::view-transition-new(.${className}) {
          width: auto;
          height: auto;
          mix-blend-mode: normal;
        }

        ::view-transition-old(.${className}) {
          animation: page-transition-leave ${Duration.Leave} ${Easing.Leave} both;
        }

        ::view-transition-new(.${className}) {
          animation: page-transition-enter ${Duration.Enter} ${enterDelay} ${Easing.Enter} both;
        }
      `}
      </style>
    </>
  );
};
