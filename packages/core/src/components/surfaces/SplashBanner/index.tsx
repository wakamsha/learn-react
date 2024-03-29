import { css } from '@emotion/css';
import { FontSize } from '../../../constants/Style';
import { gutter } from '../../../helpers/Style';

type Props = {
  /**
   * アプリケーションのタイトル
   */
  title: string;
};

/**
 * アプリケーションのタイトルロゴを表示します。
 */
export const SplashBanner = ({ title }: Props) => (
  <div className={baseStyle}>
    <h1 className={titleStyle}>{title}</h1>
  </div>
);

const baseStyle = css`
  padding: ${gutter(1)};
  border: 4px solid gray;
`;

const titleStyle = css`
  padding: ${gutter(4)};
  margin: 0;
  font-size: ${FontSize.Medium};
  color: gray;
  border: 1px solid gray;
`;
