import { css } from '@emotion/css';
import { FontSize, LineHeight } from '@learn-react/core/src/constants/Style';
import { gutter } from '@learn-react/core/src/helpers/Style';

/**
 * ビートルズについての説明を表示するページコンポーネントです。
 */
export const Home = () => (
  <div className={styleBase}>
    <p>
      ビートルズは、1960年代に世界的な人気を誇ったイギリス・リヴァプール出身のロックバンドです。メンバーはジョン・レノン、ポール・マッカートニー、ジョージ・ハリスン、リンゴ・スターの4人で構成され、革新的な音楽と文化的影響力で知られます。初期のキャッチーなポップソングから始まり、後期には高度な作曲技術や実験的なサウンドを追求しました。
    </p>

    <p>
      代表曲には「Hey Jude」「Let It
      Be」「Yesterday」などがあります。1970年に解散しましたが、音楽史における伝説的な存在として現在も愛されています。
    </p>
  </div>
);

const styleBase = css`
  display: flex;
  flex-direction: column;
  gap: ${gutter(4)};

  > p {
    font-size: ${FontSize.Regular};
    line-height: ${LineHeight.Regular};
  }
`;
