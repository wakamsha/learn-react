import { css, cx } from '@emotion/css';
import { ReactNode } from 'react';
import { Duration, Easing, Shadow } from '../../../constants/Style';

type ShadowType = 'neutral' | 'dialog' | 'floating' | 'deep';

type Props = Partial<{
  children: ReactNode;
  shadow: ShadowType;
  width: number | string;
  maxWidth: number | string;
  hover: boolean;
}>;

export const Card = ({ children, shadow = 'neutral', width, maxWidth, hover }: Props) => (
  <article className={cx(styleCard[shadow], hover && styleHover)} style={{ width, maxWidth }}>
    {children}
  </article>
);

const styleBase = css`
  background-color: white;
`;

const styleCard: Record<ShadowType, string> = {
  neutral: cx(
    styleBase,
    css`
      box-shadow: ${Shadow.Neutral};
    `,
  ),
  dialog: cx(
    styleBase,
    css`
      box-shadow: ${Shadow.Dialog};
    `,
  ),
  floating: cx(
    styleBase,
    css`
      box-shadow: ${Shadow.Floating};
    `,
  ),
  deep: cx(
    styleBase,
    css`
      box-shadow: ${Shadow.Deep};
    `,
  ),
};

const styleHover = css`
  transition: box-shadow ${Duration.Fade} ${Easing.Enter};

  &:hover {
    box-shadow: ${Shadow.Hover};
  }
`;
